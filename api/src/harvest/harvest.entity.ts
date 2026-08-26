import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProducerCrop } from '../producers/producer-crop.entity'
import { Producer } from '../producers/producer.entity'

@Entity()
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int' })
  year: number

  @ManyToOne(() => Producer, (producer) => producer.harvests)
  producer: Producer

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.harvest)
  producerCrops: ProducerCrop[]
}
