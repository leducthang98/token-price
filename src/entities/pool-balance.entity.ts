import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({
    name: 'pool-balance',
})
export class PoolBalanceEntity extends BaseEntity {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column()
    poolId: string;

    @Column()
    block: number;

    @Column({ type: 'decimal', precision: 22, scale: 8, default: 0 })
    baseAmount: number;

    @Column({ type: 'decimal', precision: 22, scale: 8, default: 0 })
    quoteAmount: number;
}