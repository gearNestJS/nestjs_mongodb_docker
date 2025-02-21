import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from 'src/schemas/cat.schema';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  /** Find one cat */
  async findOne(name: string): Promise<Cat> {
    const findedCat = await this.catModel.findOne({ name }).exec();

    if (!findedCat) {
      throw new NotFoundException(`Cat with name ${name} not found!`);
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

  // TODO: add method
  /** Update cat */
  //   async update(name: string, body: UpdateUserInput): Promise<UserPayload> {
  //     await this.userModel.updateOne({ _id: id }, body);
  //     const updatedUser = this.userModel.findById(id);

  //     return updatedUser;
  //   }

  /** Delete cat */
  async delete(name: string): Promise<void> {
    const findedCat = await this.catModel.findOne({ name }).exec();

    if (!findedCat) {
      throw new NotFoundException(`Cat with name ${name} not found!`);
    }

    await this.catModel.deleteOne({ name });
  }
}
