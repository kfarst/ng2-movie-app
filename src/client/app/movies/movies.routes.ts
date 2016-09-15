import { Route } from '@angular/router';
import { MovieListComponent, MovieDetailComponent } from './index';

export const MoviesRoutes: Route[] = [
  {
    path: 'movies',
    children: [
      {
        path: ':list_type',
        component: MovieListComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/movies/now-playing',
    pathMatch: 'full'
  },
];
