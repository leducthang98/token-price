import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import type { ChainId } from 'src/constants/chain.constant';
import { ApiConfigService } from 'src/shared/services/api-config.service';

@Injectable()
export class EvmService {
  private timeoutMilliseconds = 10000;

  constructor(private configService: ApiConfigService) {}

  private initRpcProvider(
    chainId: ChainId,
  ): ethers.providers.StaticJsonRpcProvider {
    const rpcs = this.configService.getRpcUrlsByChainId(chainId);

    const randomRpc = rpcs[Math.floor(Math.random() * rpcs.length)];

    return new ethers.providers.StaticJsonRpcProvider({
      url: randomRpc,
      timeout: this.timeoutMilliseconds,
    });
  }

  async executeCallOrSend(
    chainId: ChainId,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: (provider: ethers.providers.StaticJsonRpcProvider) => Promise<any>,
    retryTimes = 3,
  ) {
    if (!fn) {
      throw new Error('RPC Provider function is not defined');
    }

    for (let i = 0; i < retryTimes; i++) {
      try {
        const provider = this.initRpcProvider(chainId);

        // eslint-disable-next-line no-await-in-loop
        return await fn(provider);
      } catch (error) {
        console.error(`Error on executeCallOrSend: ${error.message}`);

        if (i === retryTimes - 1) {
          throw error;
        }
      }
    }
  }
}
