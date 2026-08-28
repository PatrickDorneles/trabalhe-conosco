import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Crop } from '@/crop/crop.entity';
import { ProducerCrop } from '@/harvest/producer-crop.entity';
import { RuralProperty } from '@/rural-property/rural-property.entity';
import { Harvest } from '@/harvest/harvest.entity';
import { Producer } from '@/producer/producer.entity';
import { SearchCropsRepository } from './search-crops.repository';
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto';

config({ path: '.env.test' });

describe('SearchCropsRepository (integration)', () => {
  let dataSource: DataSource;
  let searchRepo: SearchCropsRepository;

  const seedNames = ['Café', 'Cafeína', 'Soja', 'Milho', 'Algodão', 'Arroz'];

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'brain_agriculture_test',
      entities: [Producer, RuralProperty, Harvest, Crop, ProducerCrop],
      synchronize: true,
    });

    await dataSource.initialize();
    await dataSource.query(`CREATE EXTENSION IF NOT EXISTS "unaccent"`);
    await dataSource.query(`CREATE EXTENSION IF NOT EXISTS "pg_trgm"`);

    searchRepo = new SearchCropsRepository(dataSource.getRepository(Crop));

    await dataSource.query(`DELETE FROM "crop"`);
    for (const name of seedNames) {
      await dataSource.query(
        `INSERT INTO "crop" ("name", "createdAt", "updatedAt") VALUES ($1, NOW(), NOW())`,
        [name],
      );
    }
  }, 30_000);

  afterAll(async () => {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.query(`DELETE FROM "crop"`);
      await dataSource.destroy();
    }
  });

  interface CropRow {
    id: string;
    name: string;
  }

  const execute = async (term: string, page = 1, limit = 20) =>
    searchRepo.execute(term, Object.assign(new PaginationInputDTO(), { page, limit }));

  it('matches case-insensitively', async () => {
    const result = await execute('soja');
    expect(result.total).toBeGreaterThan(0);
    expect(result.data.map((c: CropRow) => c.name)).toContain('Soja');
  });

  it('matches ignoring accents', async () => {
    const result = await execute('cafe');
    expect(result.total).toBeGreaterThan(0);
    expect(result.data.map((c: CropRow) => c.name)).toContain('Café');
  });

  it('matches via trigram similarity (cafes -> Café)', async () => {
    const result = await execute('cafes');
    expect(result.total).toBeGreaterThan(0);
    expect(result.data.map((c: CropRow) => c.name)).toContain('Café');
  });

  it('orders exact matches before partial/similar matches', async () => {
    const result = await execute('cafe');
    const names = result.data.map((c: CropRow) => c.name);
    expect(names[0]).toBe('Café');
  });

  it('paginates results', async () => {
    const page1 = await execute('ca', 1, 1);
    const page2 = await execute('ca', 2, 1);

    expect(page1.data).toHaveLength(1);
    expect(page2.data).toHaveLength(1);
    expect(page1.data[0].id).not.toBe(page2.data[0].id);
    expect(page1.data[0].name).not.toBe(page2.data[0].name);
  });

  it('returns empty when nothing matches', async () => {
    const result = await execute('xyzabc');
    expect(result.total).toBe(0);
    expect(result.data).toEqual([]);
  });
});