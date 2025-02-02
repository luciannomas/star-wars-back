import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from '../../src/planets/planets.controller';
import { PlanetsService } from '../../src/planets/planets.service';

describe('PlanetsController', () => {
  let controller: PlanetsController;
  let service: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        {
          provide: PlanetsService,
          useValue: {
            getPlanetById: jest.fn().mockResolvedValue({
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
          },
        },
      ],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});