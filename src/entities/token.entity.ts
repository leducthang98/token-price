import { ChainId } from 'src/constants/chain.constant';
import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'token',
})
export class TokenEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  symbol: string;

  @Column()
  decimal: string;

  @Column({
    type: 'enum',
    enum: ChainId,
  })
  chainId: ChainId;
}
