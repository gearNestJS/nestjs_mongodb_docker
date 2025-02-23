import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Cat } from 'src/schemas/cat.schema';
import { CreateCatDto, UpdateCatDto } from './dtos';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  /** Find one cat */
  async findOne(id: string): Promise<Cat> {
    this.validateId(id);

    const findedCat = await this.catModel.findOne({ _id: id }).exec();
    if (!findedCat) {
      throw new NotFoundException(`Cat with id ${id} not found!`);
    }

    return findedCat;
  }

  /** Find all cats */
  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  /** Add cat */
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);

    return await createdCat.save();
  }

  /** Update cat */
  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    this.validateId(id);

    const updatedCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true,
    });

    if (!updatedCat) {
      throw new HttpException('Cat not found', 404);
    }

    return updatedCat;
  }

  /** Delete cat */
  async delete(id: string): Promise<Cat> {
    this.validateId(id);

    const foundCat = await this.catModel.findByIdAndDelete(id);
    if (!foundCat) {
      throw new HttpException('Cat not found', 404);
    }

    return foundCat;
  }

  /** Check if valid mongo id */
  private validateId(id: string): void {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) {
      throw new HttpException('Invalid id!', 404);
    }
  }
}
