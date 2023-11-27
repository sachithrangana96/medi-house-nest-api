import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {PharmacyrDocument  } from './pharmacy.schema'; // Make sure to use the correct import

export type MedicationDocument = HydratedDocument<Medication>;

@Schema()
export class Medication {
  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  price: number; // Use a numeric data type, such as number or Decimal128

  @Prop()
  description: string;

  @Prop()
  website: string;

  @Prop()
  gender: string; // Use a string to represent gender ('male', 'female', 'other')

  @Prop()
  manufactureDate: Date;

  @Prop()
  expireDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Pharmacy' })
  pharmacy: PharmacyrDocument; // Use the appropriate PharmacyDocument type
}

export const MedicationSchema = SchemaFactory.createForClass(Medication);
