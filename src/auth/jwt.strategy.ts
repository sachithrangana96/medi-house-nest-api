import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import {Strategy,ExtractJwt} from 'passport-jwt'
import { AuthUser, AuthUserDocument, AuthUserSchema } from '../schemas/auth-user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'srs', // Replace with your own secret key
    });
  }

  async validate(payload: any): Promise<any> {
    // const user = await this.userService.findById(payload.id);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    console.log("hbhsgbjsbxjahxbjm")
    return
  }
}