import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Crop } from '@/crop/crop.entity';
import { ProducerCrop } from '@/producer-crop/producer-crop.entity';
import { RuralProperty } from '@/rural-property/rural-property.entity';
import { Harvest } from '@/harvest/harvest.entity';
import { Producer } from '@/producer/producer.entity';

config();

const CROPS = [
  'Soja',
  'Milho',
  'Trigo',
  'Arroz',
  'Feijão',
  'Sorgo',
  'Aveia',
  'Cevada',
  'Centeio',
  'Triticale',
  'Girassol',
  'Canola',
  'Amendoim',
  'Café',
  'Cana-de-açúcar',
  'Algodão',
  'Fumo',
  'Laranja',
  'Limão',
  'Tangerina',
  'Banana',
  'Uva',
  'Maçã',
  'Pêssego',
  'Manga',
  'Abacaxi',
  'Mamão',
  'Melancia',
  'Melão',
  'Maracujá',
  'Abacate',
  'Goiaba',

  // Hortaliças
  'Tomate',
  'Batata',
  'Cebola',
  'Alho',
  'Cenoura',
  'Mandioca',
  'Batata-doce',
  'Repolho',
  'Alface',
  'Brócolis',
  'Couve-flor',
  'Pepino',
  'Pimentão',
  'Erva-mate',
  'Mate',
  'Cacau',
  'Coco',
  'Gergelim',
  'Mamona',
];

async function run() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'brain_agriculture',
    entities: [Producer, RuralProperty, Harvest, Crop, ProducerCrop],
  });

  await dataSource.initialize();

  try {
    for (const name of CROPS) {
      const repo = dataSource.getRepository(Crop);
      const existing = await repo
        .createQueryBuilder('crop')
        .where(`crop."deletedAt" IS NULL`)
        .andWhere(`unaccent(crop."name") ILIKE unaccent(:name)`, { name })
        .getOne();

      if (existing) {
        console.log(`Crop "${name}" already exists, skipping`);
        continue;
      }

      const crop = repo.create({ name });
      await repo.save(crop);
      console.log(`Crop "${name}" seeded`);
    }
  } finally {
    await dataSource.destroy();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
