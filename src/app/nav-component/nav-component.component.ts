import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rec-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.scss']
})
export class NavComponentComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
