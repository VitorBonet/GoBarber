import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealProvider from './implementations/EtherealProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
