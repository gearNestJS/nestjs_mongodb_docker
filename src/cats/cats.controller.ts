import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from 'src/schemas/cat.schema';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsService.create(createCatDto);
  }
}
