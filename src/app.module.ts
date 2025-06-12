import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FarmModule } from './farm/farm.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { ConfigModule } from '@nestjs/config';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OrmModule,
    FarmModule,
    UserModule,
    KeycloakModule.forRoot(),
  ],
})
export class AppModule {}
