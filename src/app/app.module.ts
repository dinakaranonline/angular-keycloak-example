import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { KeycloakService } from './keycloak.service';
import { UnsecuredComponent } from './unsecured/unsecured.component';

import { RouterModule, Routes } from '@angular/router';
import { SecuredComponent } from './secured/secured.component';

import { HttpClientModule } from '@angular/common/http';

export function kcFactory(keycloakService: KeycloakService): () => void {
  return () => keycloakService.init();
}

const routes: Routes = [
  { path: 'secured', component: SecuredComponent },
  { path: 'unsecured', component: UnsecuredComponent },
  { path: '',
    redirectTo: '/unsecured',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    UnsecuredComponent,
    SecuredComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
   providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    }
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
