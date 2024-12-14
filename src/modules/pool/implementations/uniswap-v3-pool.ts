import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import { ChainId } from 'src/constants/chain.constant';
import { ERROR } from 'src/constants/exception.constant';
import type {
  IPoolManager,
  PoolBalanceDto,
  PoolBalanceInputDto,
  PoolDto,
} from 'src/modules/pool/pool.interface';
import { BaseException } from 'src/shared/filters/exception.filter';
import type { ApiConfigService } from 'src/shared/services/api-config.service';
import type { EvmService } from 'src/shared/services/evm.service';

export class UniswapV3Pool implements IPoolManager {
  private protocolName = 'uniswap-v3';

  private subgraphUrls: Map<ChainId, string> = new Map();

  constructor(
    private configService: ApiConfigService,
    private evmService: EvmService,
  ) {
    this.subgraphUrls.set(
      ChainId.ETHEREUM,
      `https://gateway.thegraph.com/api/${this.configService.getTheGraphApiKey()}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`,
    );
  }

  async getPools(chainId: ChainId): Promise<PoolDto[]> {
    const subgraphUrl = this.subgraphUrls.get(chainId);

    if (!subgraphUrl) {
      throw new BaseException(ERROR.CHAIN_ID_NOT_SUPPORTED);
    }

    const query = `{
      pools{
        id
        token0{
          id
          symbol
          decimals
        }
        token1{
          id
          symbol
          decimals
        }
      }
    }`;

    const data = await axios.post(subgraphUrl, { query });

    const pools: PoolDto[] = data.data.data.pools.map((pool) => ({
      address: pool.id,
      protocol: this.protocolName,
      baseAddress: pool.token0.id,
      baseSymbol: pool.token0.symbol,
      baseDecimal: pool.token0.decimals,
      quoteAddress: pool.token1.id,
      quoteSymbol: pool.token1.symbol,
      quoteDecimal: pool.token1.decimals,
      chainId,
    }));

    return pools;
  }

  async getUnderlyingAmountAtBlock(
    poolBalanceInputDto: PoolBalanceInputDto,
  ): Promise<PoolBalanceDto> {
    const [baseBalance, quoteBalance] = await this.evmService.executeCallOrSend(
      poolBalanceInputDto.chainId,
      async (provider: ethers.providers.StaticJsonRpcProvider) => {
        const abi = [
          {
            constant: true,
            inputs: [{ name: '_user', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: 'balance', type: 'uint256' }],
            type: 'function',
          },
        ];

        const baseTokenContract = new ethers.Contract(
          poolBalanceInputDto.baseAddress,
          abi,
          provider,
        );
        const quoteTokenContract = new ethers.Contract(
          poolBalanceInputDto.quoteAddress,
          abi,
          provider,
        );

        return Promise.all([
          baseTokenContract.balanceOf(poolBalanceInputDto.address, {
            blockTag: poolBalanceInputDto.block,
          }),
          quoteTokenContract.balanceOf(poolBalanceInputDto.address, {
            blockTag: poolBalanceInputDto.block,
          }),
        ]);
      },
    );

    return {
      poolAddress: poolBalanceInputDto.address,
      block: poolBalanceInputDto.block,
      baseAmount: BigNumber.from(baseBalance),
      quoteAmount: BigNumber.from(quoteBalance),
    };
  }
}
