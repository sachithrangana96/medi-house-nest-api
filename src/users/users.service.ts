import { Model } from 'mongoose';
import { Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User,UserSchema,UserDocument } from '../schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


 
@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) {}

  /*
  
  async create(createUserDto: CreateUserDto):Promise<any> {
    return new this.userModel(createUserDto).save(); 
  }

  */

  async signup(signUpDto: SignUpDto): Promise<any> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token :token,id:user._id };
}

async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }




/*

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

 async update(id: string, updateUserDto: UpdateUserDto):Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string):Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  */


}
