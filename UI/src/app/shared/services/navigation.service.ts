import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable({providedIn: 'root'})
export class NavigationService {
  currentUrl: string;
  prevUrl: string;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.currentUrl) {
          this.prevUrl = this.currentUrl
        }
        this.currentUrl = event.urlAfterRedirects;
      }
    })
  }
}
