export class LanguageElement {
  constructor(public language: string, public value: string) {}

  out() {
    console.log("[" + this.language + "]:[" + this.value + "]");
  }
}
