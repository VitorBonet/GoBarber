import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const ProvidersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

ProvidersRouter.use(ensureAuthenticate);

ProvidersRouter.get('/', providersController.create);

ProvidersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.create,
);

ProvidersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.create,
);

export default ProvidersRouter;
