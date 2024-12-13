import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ApiConfigService } from './services/api-config.service';
import { LogService } from './services/logger.service';

const providers = [ApiConfigService, LogService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
