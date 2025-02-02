import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PlanetsService } from '../../src/planets/planets.service';

describe('PlanetsService', () => {
  let service: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: getModelToken('Planet'),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              planetId: 1,
              name: 'Tatooine',
              rotationPeriod: 23,
              orbitalPeriod: 304,
              diameter: 10465,
              climate: 'arid',
              gravity: '1 standard',
              terrain: 'desert',
              surfaceWater: 1,
              population: 200000,
              residents: ['https://swapi.dev/api/people/1/'],
              films: ['https://swapi.dev/api/films/1/'],
              created: '2014-12-09T13:50:49.641000Z',
              edited: '2014-12-20T20:58:18.411000Z',
            }),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});