import { Routes } from '@angular/router';

import { MoviesRoutes } from './movies/index';
import { NewsletterRoutes } from './newsletter/index';
import { MailingListRoutes } from './mailing-list/index';

export const routes: Routes = [
  ...MoviesRoutes,
  ...NewsletterRoutes,
  ...MailingListRoutes
];
