import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ProducerCrop } from '../producers/producer-crop.entity'

@Entity()
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int', unique: true })
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
