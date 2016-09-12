import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MovieService } from '../shared/movies/index';

import {
  MovieListComponent,
  MovieDetailComponent,
  MovieCardComponent,
  GenreListPipe
} from './index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [MovieListComponent, MovieDetailComponent, MovieCardComponent, GenreListPipe],
  exports: [MovieDetailComponent, MovieDetailComponent, MovieCardComponent, GenreListPipe],
  providers: [MovieService]
})
export class MoviesModule { }
