import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { MedicalCenterDocument } from './medical-center.schema';


export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  status: number;

  @Prop({ type: Types.ObjectId, ref: 'MedicalCenter' }) // Use ObjectId and 'User' ref
  medicalCenter: MedicalCenterDocument; 
 
 
}

export const ServiceSchema = SchemaFactory.createForClass(Service);