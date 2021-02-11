import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './old-recipes.component.html',
  styleUrls: ['./old-recipes.component.less']
})
export class OldRecipesComponent {
  isWelcomePage=false;
  order = "1";

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  // zabawa routingiem, sprawdz czy welcome page i jesli tak, to wyswietl liste skladnikow pod welcome message
  ngOnInit(): void {
    // this.authService.isLoading.next(false);
    if(this.router.url === '/recipes') this.isWelcomePage=true;
    this.router.events
    .pipe(filter(event=>event instanceof NavigationEnd))
    .subscribe((event:NavigationEnd) => {
      // console.log(event.url)
        if(event.url === '/' || event.url === '/recipes') {
          this.isWelcomePage = true;
          this.order="1";
        } else {
          this.isWelcomePage = false;
          this.order="3";
        }
    })
  }


}
