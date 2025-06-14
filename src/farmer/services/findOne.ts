import FarmerRepository from '../repository';
import AppError from 'src/shared/AppError';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindOneFarmerService {
  constructor(private repository: FarmerRepository) {}

  public async execute(id: string) {
    const farmer = await this.repository.findForBI(id);

    if (!farmer) {
      throw new AppError('ERRO: Nenhum usuário foi encontrado.', 404);
    }

    const dashboard = {
      farms: farmer.Farms.length,
      hectars: farmer.Farms.reduce((prevValue, current) => {
        prevValue += current.totalArea;
        return prevValue;
      }, 0),
      graphs: {
        states: farmer.Farms.reduce(
          (acc, farm) => {
            acc[farm.state] = (acc[farm.state] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),

        cities: farmer.Farms.reduce(
          (acc, farm) => {
            acc[farm.city] = (acc[farm.city] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),

        cultivares: farmer.Farms.flatMap((farm) => farm.Harvests || [])
          .flatMap((harvest) => harvest.Cultivares || [])
          .reduce(
            (acc, cultivar) => {
              acc[cultivar.name] = (acc[cultivar.name] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          ),
      },
    };

    return { ...farmer, dashboard };
  }
}
