export class CreateSpeciesDto {
    readonly speciesId: number;
    readonly name: string;
    readonly classification: string;
    readonly designation: string;
    readonly homeworld: string;
    readonly language: string;
    readonly people: string[];
    readonly films: string[];
    readonly created: string;
    readonly edited: string;
  }