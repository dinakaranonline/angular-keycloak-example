import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  public keycloakAuth: any;

  constructor() { }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
    /*     'url': 'http://localhost:8888/auth',
        'realm': 'example',
        'clientId': 'js-console' */
        'url': 'https://sso-hello-world-project.apps.na311.openshift.opentlc.com/auth',
        'realm': 'test-microservices-realm',
        'clientId': 'microservices-app'
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          resolve();
        })
        .error(() => {
          reject();
        });
      });
  }

  getToken(): string {
    return this.keycloakAuth.token;
  }
}
