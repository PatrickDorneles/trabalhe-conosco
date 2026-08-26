import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProducerCrop } from './producer-crop.entity'
import { Harvest } from '../harvest/harvest.entity'

@Entity()
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  document: string

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

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.producer)
  producerCrops: ProducerCrop[]

  @OneToMany(() => Harvest, (harvest) => harvest.producer)
  harvests: Harvest[]
}
