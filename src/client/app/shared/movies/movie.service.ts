import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  imdb_id: string;
  vote_average: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  runtime: number;
  genres: any[];
  production_companies: any[];
}

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class MovieService {
  private static API_KEY: string = "your key here";

  /**
   * Creates a new MovieService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(endpoint: string|number): Observable<Movie[]> {
    return this.http.get(`/3/movie/${endpoint}?api_key=${MovieService.API_KEY}`)
                    .map((res: Response) => res.json().results)
                    .catch(this.handleError);
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

