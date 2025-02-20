import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from 'src/schemas/cat.schema';
import { CatsController } from './cats.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
