import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RuralProperty } from './rural-property.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RuralProperty])],
  exports: [TypeOrmModule],
})
export class RuralPropertyModule {}
