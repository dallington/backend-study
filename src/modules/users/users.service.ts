import { Model } from 'mongoose';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { hashedPassword } from 'src/utils/authentication';
import { dbErrorCode } from 'src/utils/dbErrorCode';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User | Error> {
    const userHasPassword = await hashedPassword(createUserDto.password);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: userHasPassword,
    });
    return await createdUser
      .save()
      .then(() => {
        createdUser.password = undefined;
        return createdUser;
      })
      .catch((error) => {
        let message = null;

        if (error?.code === dbErrorCode.DuplicateKey) {
          message = 'User with that email already exists';
        }
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: message || error.message,
          },
          HttpStatus.FORBIDDEN,
        );
      });

    //return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
    return;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<any> {
    console.log('find', email);
    return await this.userModel.findOne({ email: email }).exec();
  }

  /*  async findOneByEmail(email: string): Promise<User | undefined> {
    console.log(email);
    const UserEmail = this.userModel.find({ email: email });
    console.log(UserEmail);
    return;
  } */

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return await this.userModel
      .findByIdAndDelete({
        _id: id,
      })
      .exec();
  }
}
