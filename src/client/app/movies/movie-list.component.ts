import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { MovieService, GenreService, Movie, Genre } from '../shared/index';
import { MovieCardComponent } from './index';

/**
 * This class represents the lazy loaded MovieComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'movie-list',
  templateUrl: 'movie-list.component.html',
  styleUrls: ['movie-list.component.css'],
})

export class MovieListComponent implements OnInit {

  @ViewChildren(MovieCardComponent) movieCardComponents: QueryList<MovieCardComponent>;

  listType: string;
  errorMessage: string;
  movies: Movie[] = [];
  genres: Genre[] = [];
  sub: Subscription;

  /**
   * Creates an instance of the MovieListComponent with the injected
   * MovieService.
   *
   * @param {MovieService} movieService - The injected MovieService.
   */
  constructor(
    private movieService: MovieService,
    private genreService: GenreService,
    private route: ActivatedRoute
  ) {}

  /**
   * Get the movies OnInit
   */
  ngOnInit() {
    this.sub = this.route
    .params
    .subscribe(params => {
      this.listType = params['list_type'];
      this.getMovies();
    });
  }

  /**
   * Handle the movieService observable
   */
  getMovies() {
    this.genreService.get()
    .subscribe(
      genres => {
        this.genres = genres;

        this.movieService.get(this.listType.replace('-', '_'))
        .subscribe(
          movies => this.movies = movies,
            error =>  this.errorMessage = <any>error
        );
      },
      error =>  this.errorMessage = <any>error
    );
  }
}
