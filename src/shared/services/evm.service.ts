import type { ChainId } from 'src/constants/chain.constant';

export class EvmService {
  private rpcs: string[] = [];

  constructor(_chainId: ChainId) {
    // todo: get rpcs from chainId
  }
}
