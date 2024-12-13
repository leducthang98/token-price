import { ChainId } from "src/constants/chain.constant";
import { PoolDto, PoolBalanceDto } from "src/modules/pool/dto/pool.dto";
import { IPoolManager } from "src/modules/pool/pool.interface";

export class UniswapV3Pool implements IPoolManager {
    getPools(chainId: ChainId): Promise<PoolDto[]> {
        throw new Error("Method not implemented.");
    }
    getUnderlyingAmountAtBlock(chainId: ChainId, poolAddress: string, block: number): Promise<PoolBalanceDto> {
        throw new Error("Method not implemented.");
    }
}