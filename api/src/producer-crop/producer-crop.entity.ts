import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { RuralProperty } from '@/rural-property/rural-property.entity'
import { Harvest } from '@/harvest/harvest.entity'
import { Crop } from '@/crop/crop.entity'

@Entity()
export class ProducerCrop {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => RuralProperty, (property) => property.producerCrops)
  ruralProperty: RuralProperty

  @ManyToOne(() => Harvest, (harvest) => harvest.producerCrops)
  harvest: Harvest

  @ManyToOne(() => Crop, (crop) => crop.producerCrops)
  crop: Crop

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}