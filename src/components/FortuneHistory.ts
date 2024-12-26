import { loadFromLocalStorage } from "../utils/localStorageHelper";

interface FortuneEntry {
  date: string;
  fortune: string;
}

export class FortuneHistory {
  private historyElement: HTMLDivElement;

  constructor(historyElementId: string) {
    this.historyElement = document.getElementById(
      historyElementId
    ) as HTMLDivElement;
  }

  public displayHistory(): void {
    try {
      const history: FortuneEntry[] =
        loadFromLocalStorage("fortuneHistory") || [];
      if (this.historyElement) {
        this.historyElement.innerHTML = history
          .map(
            (entry: { date: string; fortune: string }) =>
              `<p>${entry.date}: ${entry.fortune}</p>`
          )
          .join("");
      }
    } catch (error) {
      console.error("Error displaying fortune history:", error);
    }
  }
}
