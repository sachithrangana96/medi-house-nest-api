import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser, AuthUserDocument, AuthUserSchema } from 'src/schemas/auth-user.schema';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(@InjectModel(AuthUser.name) private userAuthModel: Model<AuthUserDocument>, private jwtService: JwtService) { }

    async signup(signUpDto: SignUpDto): Promise<any> {
        const { name, email, password } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userAuthModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
    
        const user = await this.userAuthModel.findOne({ email });
    
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
}
