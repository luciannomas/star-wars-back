export interface Person {
    personId: number;
    name: string;
    birthYear: string;
    gender: string;
    height: number;
    films: string[];
  }
  
  export type PersonResponse = Person;