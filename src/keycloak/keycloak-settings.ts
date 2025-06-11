import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakSettings {
  public url: string;
  public realm: string;
  public adminUser: string;
  public adminPassword: string;
  public clientID: string;
  public clientSecret: string;
  public requestTimeout: number;

  constructor(config: ConfigService) {
    this.url = config.get<string>('keycloak.auth_server_url');
    this.realm = config.get<string>('keycloak.realm');
    this.adminUser = config.get<string>('keycloak.admin');
    this.adminPassword = config.get<string>('keycloak.admin_password');
    this.clientID = config.get<string>('keycloak.client_id');
    this.clientSecret = config.get<string>('keycloak.secret');
    this.requestTimeout = config.get<number>('keycloak.request_timeout');
  }
}
