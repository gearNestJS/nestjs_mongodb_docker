import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from 'src/schemas/cat.schema';
import { CreateCatDto } from './dtos/create-cat.dto';
import { UpdateCatDto } from './dtos';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async findOne(@Param('id') id: string): Promise<Cat> {
    return await this.catsService.findOne(id);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsService.create(createCatDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return await this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<Cat> {
    return this.catsService.delete(id);
  }
}
