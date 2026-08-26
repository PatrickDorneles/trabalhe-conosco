import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProducerCrop } from '../producers/producer-crop.entity'

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.crop)
  producerCrops: ProducerCrop[]
}
