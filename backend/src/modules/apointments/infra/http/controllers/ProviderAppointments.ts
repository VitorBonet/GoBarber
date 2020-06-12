import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentService from '@modules/apointments/services/ListProviderAppointmentService';

export default class ProviderAppointments {
  public async create(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointmentService = container.resolve(
      ListProviderAppointmentService,
    );

    const appointments = await listProviderAppointmentService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}
