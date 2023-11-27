import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { MedicalCenterDocument } from './medical-center.schema';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
  @Prop()
  name: string;

  @Prop()
  email: string;


  @Prop()
  contactNumber: number;


  @Prop()
  specialization: string;


  @Prop()
  experiance: number;


  @Prop({ type: Types.ObjectId, ref: 'MedicalCenter' }) // Use ObjectId and 'User' ref
  medicalCenter: MedicalCenterDocument; // Use the appropriate UserDocument type

 
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);