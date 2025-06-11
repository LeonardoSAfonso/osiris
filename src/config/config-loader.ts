import { existsSync, readFileSync } from 'fs';
import { load as loadYAML } from 'js-yaml';
import merge from 'lodash/merge';

export class ConfigLoader {
  private readonly defaultEnv = 'development';
  private readonly env = process.env.NODE_ENV || this.defaultEnv;
  private readonly EnvConfigPath = this.configPath(this.env);
  private readonly LocalConfigPath = this.configPath('local');

  constructor() {
    if (!existsSync(this.EnvConfigPath)) {
      throw new Error('config file missing: ' + this.EnvConfigPath);
    }
  }

  static load() {
    return new ConfigLoader().load();
  }

  load(): Record<string, unknown> {
    return merge(this.envConfig(), this.localOverrides());
  }

  private envConfig() {
    return this.loadConfig(this.EnvConfigPath);
  }

  private localOverrides() {
    if (!existsSync(this.LocalConfigPath)) return {};

    return this.loadConfig(this.LocalConfigPath);
  }

  private configPath(name: string) {
    return `src/config/${name}.yml`;
  }

  private loadConfig(path: string) {
    return loadYAML(readFileSync(path, 'utf8')) as Record<string, unknown>;
  }
}
