import { Component, ElementRef, Directive, Input, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'formish';

  status: boolean = false;

  choonseButton: string = 'btn btn-primary';
  activeRouter: string = 'home';

  constructor(private router: Router, private elRef: ElementRef) {

    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      console.log(event.url);
      if (event.url == '/home') {

        this.activeRouter = 'home';
      }
      else if (event.url == '/report') {

        this.activeRouter = 'report';
      }
    });
   }

  changeStatus() {

    this.status = !this.status;
  }
}
