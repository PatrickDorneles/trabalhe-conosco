import { CreateInitialTables1787754328066 } from '@/database/migrations/1787754328066-CreateInitialTables'
import { RestructureRuralProperty1787776348051 } from '@/database/migrations/1787776348051-RestructureRuralProperty'
import { AddTimestampsAndSoftDelete1787796709304 } from '@/database/migrations/1787796709304-AddTimestampsAndSoftDelete'
import { ReplaceDocumentUniqueWithPartialIndex1787803117086 } from '@/database/migrations/1787803117086-ReplaceDocumentUniqueWithPartialIndex'
import { RemoveHarvestYearUniqueness1787860748224 } from '@/database/migrations/1787860748224-RemoveHarvestYearUniqueness'
import { EnableSearchExtensions1787892680094 } from '@/database/migrations/1787892680094-EnableSearchExtensions'
import { RemoveCropNameUniqueness1787896540447 } from '@/database/migrations/1787896540447-RemoveCropNameUniqueness'

export const migrations = [
  CreateInitialTables1787754328066,
  RestructureRuralProperty1787776348051,
  AddTimestampsAndSoftDelete1787796709304,
  ReplaceDocumentUniqueWithPartialIndex1787803117086,
  RemoveHarvestYearUniqueness1787860748224,
  EnableSearchExtensions1787892680094,
  RemoveCropNameUniqueness1787896540447,
]
