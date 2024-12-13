import { ChainId } from "src/constants/chain.constant";
import { PoolBalanceDto, PoolDto } from "src/modules/pool/dto/pool.dto";

export interface IPoolManager {
    getPools(chainId: ChainId): Promise<PoolDto[]>;
    getUnderlyingAmountAtBlock(chainId: ChainId, poolAddress: string, block: number): Promise<PoolBalanceDto>;
}