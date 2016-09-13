import { Subscription, Observable } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from './index';

import {
  MovieService,
  GenreService,
  FavoritesService,
  Movie,
  Genre
} from '../shared/index';

import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

/**
 * This class represents the lazy loaded MovieComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'movie-list',
  templateUrl: 'movie-list.component.html',
  styleUrls: ['movie-list.component.css'],
})

export class MovieListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('movieCard') movieCardComponents: QueryList<MovieCardComponent>;

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
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
  ) { }

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

  ngAfterViewInit() {
    this.movieCardComponents.notifyOnChanges();
    this.emitNewFavoriteCount();
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

  toggleAsFavorite (movieComponent: MovieCardComponent) {
    movieComponent.isFavorited = !movieComponent.isFavorited;
    this.emitNewFavoriteCount();
  }

  emitNewFavoriteCount(): void {
    this.favoritesService.emit(
      this.movieCardComponents.filter(comp => comp.isFavorited).length
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
