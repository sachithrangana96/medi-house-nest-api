import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from './users.schema';
import { DoctorDocument } from './doctor.schema';
import { ServiceDocument } from './services.schema';


export type MedicalCenterDocument = HydratedDocument<MedicalCenter>;

@Schema()
export class MedicalCenter {
  @Prop()
  name: string;

  @Prop()
  email: string;


  @Prop()
  contactNumber: number;


  @Prop()
  description: string;

  @Prop()
  website: string;

  @Prop()
  imageUrl: string;


  @Prop()
  registrationDate: Date;

  @Prop()
  status: number;

  @Prop()
  lat: number;

  @Prop()
  long: number;

  @Prop()
  location: string;



  @Prop({ type: Types.ObjectId, ref: 'User' }) // Use ObjectId and 'User' ref
  user: UserDocument; // Use the appropriate UserDocument type

  @Prop({ type: [Types.ObjectId], ref: 'Doctor' })
  doctors: DoctorDocument[];

  @Prop({ type: [Types.ObjectId], ref: 'Service' })
  services: ServiceDocument[];

 
}

export const MedicalCenterSchema = SchemaFactory.createForClass(MedicalCenter);