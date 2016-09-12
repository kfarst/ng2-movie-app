import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { MovieListService, Movie } from '../shared/index';

/**
 * This class represents the lazy loaded MovieListComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'movie-list',
  templateUrl: 'movie-list.component.html',
  styleUrls: ['movie-list.component.css'],
})

export class MovieListComponent implements OnInit {

  listType: string;
  errorMessage: string;
  movies: Movie[] = [];
  sub: Subscription;

  /**
   * Creates an instance of the MovieListComponent with the injected
   * MovieListService.
   *
   * @param {MovieListService} movieListService - The injected MovieListService.
   */
  constructor(private movieListService: MovieListService, private route: ActivatedRoute) {}

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
   * Handle the movieListService observable
   */
  getMovies() {
    this.movieListService.get(this.listType.replace('-', '_'))
		     .subscribe(
		       movies => this.movies = movies,
		       error =>  this.errorMessage = <any>error
		       );
  }
}
