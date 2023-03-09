import { Globals } from './../shared/globals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rec-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  constructor(
    private globals: Globals
  ) { }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.globals.lang = lang;
  }

  getLang() {
    console.log(this.globals.lang)
    return this.globals.lang
  }

}
