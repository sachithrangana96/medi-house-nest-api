import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';


export type AuthUserDocument = HydratedDocument<AuthUser>;

@Schema({
  timestamps: true,
})
export class AuthUser extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);