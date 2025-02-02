export interface Relation {
    personId: number;
    personName: string;
    films: string[];
  }
  
  export interface PersonFilms {
    personName: string;
    films: string[];
  }
  export interface PlanetResidents {
    planetId: number;
    planetName: string;
    residents: {
      name: string;
      species: string;
      films: string[];
    }[];
    films: string[];
  }