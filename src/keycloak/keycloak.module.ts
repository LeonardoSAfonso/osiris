import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { Issuer } from 'openid-client';
import { ISSUER_CLIENT } from './constants';
import { KeycloakAuthService } from './keycloak-auth.service';
import { KeycloakSettings } from './keycloak-settings';
import { KeycloakUserService } from './keycloak-user.service';

@Module({})
export class KeycloakModule {
  static forRoot(): DynamicModule {
    return {
      module: KeycloakModule,
      global: true,
      imports: [
        KeycloakConnectModule.registerAsync({
          useFactory: (config: ConfigService) => ({
            authServerUrl: config.get<string>('keycloak.auth_server_url'),
            realm: config.get<string>('keycloak.realm'),
            clientId: config.get<string>('keycloak.client_id'),
            secret: config.get<string>('keycloak.secret'),
            useNestLogger: false,
          }),
          inject: [ConfigService],
        }),
        JwtModule.registerAsync({
          useFactory: (config: ConfigService) => ({
            secret: config.get<string>('jwt.secret'),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        { provide: APP_GUARD, useClass: AuthGuard },
        { provide: APP_GUARD, useClass: ResourceGuard },
        { provide: APP_GUARD, useClass: RoleGuard },
        KeycloakSettings,
        {
          provide: KeycloakAdminClient,
          inject: [KeycloakSettings],
          useFactory: (settings: KeycloakSettings) => {
            const client = new KeycloakAdminClient({
              baseUrl: settings.url,
              realmName: settings.realm,
            });

            client.auth({
              username: settings.adminUser,
              password: settings.adminPassword,
              grantType: 'password',
              clientId: settings.clientID,
              clientSecret: settings.clientSecret,
            });

            return client;
          },
        },
        {
          provide: ISSUER_CLIENT,
          inject: [KeycloakSettings],
          useFactory: async (settings: KeycloakSettings) => {
            const issuer = await Issuer.discover(
              `${settings.url}/realms/${settings.realm}`,
            );

            return new issuer.Client({
              client_id: settings.clientID,
              client_secret: settings.clientSecret,
              token_endpoint_auth_method: 'client_secret_basic',
            });
          },
        },
        KeycloakUserService,
        KeycloakAuthService,
      ],
      exports: [KeycloakUserService, KeycloakAuthService, JwtModule],
    };
  }
}
