import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from '../../src/species/species.controller';
import { SpeciesService } from '../../src/species/species.service';

describe('SpeciesController', () => {
  let controller: SpeciesController;
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [
        {
          provide: SpeciesService,
          useValue: {
            getSpeciesById: jest.fn().mockResolvedValue({
              speciesId: 1,
              name: 'Human',
              classification: 'mammal',
              designation: 'sentient',
              averageHeight: 180,
              skinColors: ['caucasian', 'black', 'asian'],
              hairColors: ['blonde', 'brown', 'black', 'red'],
              eyeColors: ['brown', 'blue', 'green', 'hazel'],
              averageLifespan: 120,
              homeworld: 'https://swapi.dev/api/planets/9/',
              language: 'Galactic Basic',
              people: ['https://swapi.dev/api/people/1/'],
              films: ['https://swapi.dev/api/films/1/'],
              created: '2014-12-10T13:52:11.567000Z',
              edited: '2014-12-20T21:36:42.136000Z',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return species by ID', async () => {
    const speciesId = "1";
    const result = await controller.getSpecies(speciesId);
    expect(result).toEqual({
      speciesId: 1,
      name: 'Human',
      classification: 'mammal',
      designation: 'sentient',
      averageHeight: 180,
      skinColors: ['caucasian', 'black', 'asian'],
      hairColors: ['blonde', 'brown', 'black', 'red'],
      eyeColors: ['brown', 'blue', 'green', 'hazel'],
      averageLifespan: 120,
      homeworld: 'https://swapi.dev/api/planets/9/',
      language: 'Galactic Basic',
      people: ['https://swapi.dev/api/people/1/'],
      films: ['https://swapi.dev/api/films/1/'],
      created: '2014-12-10T13:52:11.567000Z',
      edited: '2014-12-20T21:36:42.136000Z',
    });
  });
});