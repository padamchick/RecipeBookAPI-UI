import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {NewRecipesComponent} from './new-recipes.component';
import {SecondNavbarNewRecipesComponent} from './second-navbar-new-recipes/second-navbar-new-recipes.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import {NewRecipesResolverService} from './new-recipes-resolver.service';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import {AuthGuard} from '../../../auth/auth.guard';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: SecondNavbarNewRecipesComponent, outlet: 'second-nav-bar'},
      {path: '', pathMatch: 'full', redirectTo: '/new-recipes/all'},
      {path: ':category',
        component: NewRecipesComponent,
        resolve: [NewRecipesResolverService],
        canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    NewRecipesComponent,
    SecondNavbarNewRecipesComponent,
    TopBarComponent,
    RecipeCardComponent,
    CardsContainerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})


export class NewRecipesModule {
}
