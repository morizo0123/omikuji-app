export function saveToLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key: string): any {
  return JSON.parse(localStorage.getItem(key) || "null");
}
