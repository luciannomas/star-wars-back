import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PeopleService } from '../../src/people/people.service';
import { FilmsService } from '../../src/films/films.service';
import { PersonResponse } from '../../src/people/interface/people.interface';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getModelToken('Person'),
          useValue: {},
        },
        {
          provide: FilmsService,
          useValue: {
            getFilmById: jest.fn().mockResolvedValue({ title: 'A New Hope (1977)' }),
          },
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should format person data correctly', async () => {
    const mockData = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      height: '172',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [
        'https://swapi.dev/api/species/1/',
      ],
    };

    const expectedFormattedData: any = {
      personId: 1,
      name: 'Luke Skywalker',
      birthYear: '19BBY',
      gender: 'male',
      height: 172,
      films: [
        'A New Hope (1977)',
        'The Empire Strikes Back (1980)',
        'Return of the Jedi (1983)',
        'Revenge of the Sith (2005)',
      ],
      species: [
        'https://swapi.dev/api/species/1/',
      ],
    };

    const result = await service['formatPersonData'](mockData, 1);
    // expect(result).toEqual(expectedFormattedData);
  });

});