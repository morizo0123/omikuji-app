import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./utils/localStorageHelper";
import { FortuneHistory } from "./components/FortuneHistory";

// Enumでおみくじの種類を定義
enum FortuneType {
  General = "general",
  Love = "love",
  Money = "money",
}

// おみくじアプリのクラス
export class OmikujiApp {
  private fortuneTypes: { [key in FortuneType]: string[] } = {
    [FortuneType.General]: ["大吉", "中吉", "小吉", "吉", "末吉", "凶", "大凶"],
    [FortuneType.Love]: ["恋愛大吉", "恋愛中吉", "恋愛小吉", "恋愛凶"],
    [FortuneType.Money]: ["金運大吉", "金運中吉", "金運小吉", "金運凶"],
  };

  private drawButton: HTMLButtonElement;
  private resultElement: HTMLParagraphElement;
  private selectElement: HTMLSelectElement;
  private history: FortuneHistory;

  constructor() {
    // HTML要素の取得
    this.drawButton = document.getElementById(
      "drawButton"
    ) as HTMLButtonElement;
    this.resultElement = document.getElementById(
      "result"
    ) as HTMLParagraphElement;
    this.selectElement = document.getElementById(
      "fortuneType"
    ) as HTMLSelectElement;

    // Initialize FortuneHistory component
    this.history = new FortuneHistory("history");

    // ボタンが存在する場合のみイベントリスナーを設定
    if (this.drawButton) {
      this.drawButton.addEventListener("click", () => this.drawFortune());
    }

    // ページ読み込み時に履歴を表示
    this.history.displayHistory();
  }

  // おみくじの履歴を保存するメソッド
  private saveFortuneHistory(fortune: string): void {
    try {
      const history = loadFromLocalStorage("fortuneHistory") || [];
      const newEntry = {
        date: new Date().toLocaleString(),
        fortune,
      };
      history.push(newEntry);
      saveToLocalStorage("fortuneHistory", history);
    } catch (error) {
      console.error("Error saving fortune history:", error);
    }
  }

  // おみくじを引くメソッド
  private drawFortune(): void {
    if (!this.selectElement || !this.resultElement) return;

    const selectedType = this.selectElement.value as FortuneType;
    const fortunes = this.fortuneTypes[selectedType];

    if (!fortunes) {
      console.error(`Invalid fortune type selected: ${selectedType}`);
      return;
    }

    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const fortune = fortunes[randomIndex];

    // 結果を表示
    this.resultElement.textContent = `あなたの${selectedType}の運勢は: ${fortune} です！`;

    // 履歴を保存し、表示を更新
    this.saveFortuneHistory(fortune);
    this.history.displayHistory();
  }
}
