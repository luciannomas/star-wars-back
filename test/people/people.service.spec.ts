import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeopleService } from './../../src/people/people.service';
import { PersonResponse } from 'src/people/interface/people.interface';


describe('PeopleService', () => {
  let service: PeopleService;

  const mockPersonModel = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getModelToken('Person'),
          useValue: mockPersonModel,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should format person data correctly', () => {
    const mockData = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      height: '172',
      films: [
        'A New Hope (1977)',
        'The Empire Strikes Back (1980)',
        'Return of the Jedi (1983)',
        'Revenge of the Sith (2005)',
      ],
    };

    const expectedFormattedData: PersonResponse = {
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
    };

    const result = service['formatPersonData'](mockData, 1);
    expect(result).toEqual(expectedFormattedData);
  });

});