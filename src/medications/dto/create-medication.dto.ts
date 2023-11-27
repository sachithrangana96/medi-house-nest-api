export class CreateMedicationDto {
    readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly description: string;
  readonly website: string;
  readonly gender: string;
  readonly manufactureDate: Date;
  readonly expireDate: Date;
  readonly pharmacy: string;
}
