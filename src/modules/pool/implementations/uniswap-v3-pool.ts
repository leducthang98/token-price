import type { ChainId } from 'src/constants/chain.constant';
import type { PoolBalanceDto, PoolDto } from 'src/modules/pool/dto/pool.dto';
import type { IPoolManager } from 'src/modules/pool/pool.interface';

export class UniswapV3Pool implements IPoolManager {
  getPools(_chainId: ChainId): Promise<PoolDto[]> {
    throw new Error('Method not implemented.');
  }

  getUnderlyingAmountAtBlock(
    _chainId: ChainId,
    _poolAddress: string,
    _block: number,
  ): Promise<PoolBalanceDto> {
    throw new Error('Method not implemented.');
  }
}
