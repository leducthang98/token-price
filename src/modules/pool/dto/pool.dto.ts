import { ChainId } from "src/constants/chain.constant";

export class PoolDto {
    address: string;
    baseSymbol: string;
    protocol: string;
    baseAddress: string;
    quoteAddress: string;
    quoteSymbol: string;
    chainId: ChainId;
}

export class PoolBalanceDto {
    poolAddress: string;
    block: number;
    baseAmount: number;
    quoteAmount: number;
}