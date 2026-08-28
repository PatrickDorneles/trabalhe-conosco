import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ProducerCrop } from '@/producer-crop/producer-crop.entity'

@Entity()
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int' })
  year: number

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.harvest)
  producerCrops: ProducerCrop[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
