import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieListService } from '../shared/movies/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [MovieListComponent, MovieDetailComponent],
  exports: [MovieDetailComponent, MovieDetailComponent],
  providers: [MovieListService]
})
export class MoviesModule { }
