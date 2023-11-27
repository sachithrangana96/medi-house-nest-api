import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from './users.schema';
import { MedicationDocument } from './medication.schema';


export type PharmacyrDocument = HydratedDocument<Pharmacy>;

@Schema()
export class Pharmacy {
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

  @Prop({ type: [Types.ObjectId], ref: 'Medication' })
  medications: MedicationDocument[];
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);