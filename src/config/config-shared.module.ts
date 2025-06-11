import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigLoader } from './config-loader';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ConfigLoader.load] }),
  ],
  exports: [ConfigModule],
})
export class ConfigSharedModule {}
