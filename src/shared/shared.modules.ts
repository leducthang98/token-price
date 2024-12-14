import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { EvmService } from 'src/shared/services/evm.service';

import { ApiConfigService } from './services/api-config.service';
import { LogService } from './services/logger.service';

const providers = [ApiConfigService, LogService, EvmService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
