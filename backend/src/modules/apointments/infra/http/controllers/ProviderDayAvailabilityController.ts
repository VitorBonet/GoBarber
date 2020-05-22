import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/apointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
