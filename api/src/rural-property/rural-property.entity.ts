import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Producer } from '@/producer/producer.entity'
import { ProducerCrop } from '@/harvest/producer-crop.entity'

@Entity()
export class RuralProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  farmName: string

  @Column()
  city: string

  @Column()
  state: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalArea: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  arableArea: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vegetationArea: number

  @ManyToOne(() => Producer, (producer) => producer.properties)
  producer: Producer

  @OneToMany(() => ProducerCrop, (crop) => crop.ruralProperty)
  producerCrops: ProducerCrop[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
