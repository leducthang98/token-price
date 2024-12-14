import type { BigNumber } from 'ethers';
import type { ChainId } from 'src/constants/chain.constant';

export class PoolDto {
  address: string;

  protocol: string;

  baseSymbol: string;

  baseAddress: string;

  baseDecimal: number;

  quoteAddress: string;

  quoteSymbol: string;

  quoteDecimal: number;
}

export class PoolBalanceInputDto {
  address: string;

  baseAddress: string;

  quoteAddress: string;

  chainId: ChainId;

  block: number;
}

export class PoolBalanceDto {
  poolAddress: string;

  block: number;

  baseAmount: BigNumber;

  quoteAmount: BigNumber;
}

export interface IPoolManager {
  getPools(chainId: ChainId): Promise<PoolDto[]>;
  getUnderlyingAmountAtBlock(
    poolBalanceInputDto: PoolBalanceInputDto,
  ): Promise<PoolBalanceDto>;
}
