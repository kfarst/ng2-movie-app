import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface Genre {
  id: number;
  name: string;
}

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class GenreService {
  private static API_KEY: string = "a07e22bc18f5cb106bfe4cc1f83ad8ed";

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
  get(endpoint: string|number): Observable<Genre[]> {
    return this.http.get(`/3/genre/movie/list?api_key=${GenreService.API_KEY}`)
                    .map((res: Response) => res.json().genres)
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

