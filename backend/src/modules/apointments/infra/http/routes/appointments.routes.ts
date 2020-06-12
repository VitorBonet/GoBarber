import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointments from '../controllers/ProviderAppointments';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointments = new ProviderAppointments();

appointmentRouter.use(ensureAuthenticate);

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentRouter.get('/me', providerAppointments.create);

export default appointmentRouter;
