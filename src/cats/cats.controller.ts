import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Cat> {
    return await this.catsService.findOne(name);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsService.create(createCatDto);
  }

  @Delete(':name')
  deleteUser(@Param('name') name: string) {
    return this.catsService.delete(name);
  }
}
