import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Crop } from '@/crop/crop.entity'
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto'
import { PaginationOutputDTO } from '@/shared/dtos/pagination-output.dto'

@Injectable()
export class SearchCropsRepository {
  constructor(
    @InjectRepository(Crop)
    private readonly repo: Repository<Crop>,
  ) { }

  async execute(
    term: string,
    pagination: PaginationInputDTO,
  ): Promise<PaginationOutputDTO<Crop>> {
    const normalized = term.trim()

    const query = this.repo
      .createQueryBuilder('crop')
      .where(`crop."deletedAt" IS NULL`)
      .andWhere(
        `(
          unaccent(crop."name") ILIKE unaccent(:likePattern)
          OR unaccent(crop."name") % unaccent(:term)
        )`,
        { likePattern: `%${normalized}%`, term: normalized },
      )
      .orderBy(
        `GREATEST(
          similarity(unaccent(crop."name"), unaccent(:similarityTerm)),
          CASE WHEN unaccent(crop."name") ILIKE unaccent(:exactTerm) THEN 1 ELSE 0 END
        )`,
        'DESC',
      )
      .addOrderBy('crop."name"', 'ASC')
      .setParameters({ similarityTerm: normalized, exactTerm: normalized })
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)

    const [data, total] = await Promise.all([
      query.getMany(),
      query.clone().orderBy().skip(0).take(0).getCount(),
    ])

    return new PaginationOutputDTO(data, total, pagination.page, pagination.limit)
  }
}