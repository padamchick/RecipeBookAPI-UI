import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './project-container/auth/auth-interceptor.service';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {RecipeEffects} from './project-container/recipes/store/recipe.effects';
import {AuthEffects} from './project-container/auth/store/auth.effects';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ToastrModule} from 'ngx-toastr';
import {MainLeftNavbarComponent} from './main-left-navbar/main-left-navbar.component';
import {NewRecipesModule} from './project-container/new-recipes/new-recipes.module';
import {ProjectContainerComponent} from './project-container/project-container.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLeftNavbarComponent,
    ProjectContainerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgbModule,
        StoreModule.forRoot(fromApp.appReducer),
        EffectsModule.forRoot([RecipeEffects, AuthEffects]),
        StoreDevtoolsModule.instrument({logOnly: environment.production}),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NewRecipesModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
