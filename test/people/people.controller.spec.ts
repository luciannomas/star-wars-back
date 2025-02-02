import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from '../../src/people/people.controller';
import { PeopleService } from '../../src/people/people.service';
import { PersonResponse } from '../../src/people/interface/people.interface';
import { NotFoundException } from '@nestjs/common';

describe('PeopleController', () => {
  let peopleController: PeopleController;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: {
            getPersonById: jest.fn(),
          },
        },
      ],
    }).compile();

    peopleController = module.get<PeopleController>(PeopleController);
    peopleService = module.get<PeopleService>(PeopleService);
  });

  describe('getPerson', () => {
    it('should return a person object', async () => {
      const result: any = {
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

      jest.spyOn(peopleService, 'getPersonById').mockResolvedValue(result);

      expect(await peopleController.getPerson('1')).toBe(result);
    });

    it('should throw a NotFoundException if person is not found', async () => {
      jest.spyOn(peopleService, 'getPersonById').mockRejectedValue(new NotFoundException());

      await expect(peopleController.getPerson('2')).rejects.toThrow(NotFoundException);
    });
  });
});