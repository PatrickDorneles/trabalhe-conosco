import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Producer } from './producer.entity'
import { Crop } from '../crop/crop.entity'
import { Harvest } from '../harvest/harvest.entity'

@Entity()
export class ProducerCrop {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Producer, (producer) => producer.producerCrops)
  producer: Producer

  @ManyToOne(() => Harvest, (harvest) => harvest.producerCrops)
  harvest: Harvest

  @ManyToOne(() => Crop, (crop) => crop.producerCrops)
  crop: Crop
}
