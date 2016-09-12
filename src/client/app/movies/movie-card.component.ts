import { Component, Input } from '@angular/core';
import { Movie, Genre } from '../shared/index';

/**
 * This class represents the lazy loaded MovieCardComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'movie-card',
  templateUrl: 'movie-card.component.html',
  styleUrls: ['../shared/styles.css', 'movie-card.component.css'],
})

export class MovieCardComponent {
  @Input() movie: Movie;
  @Input() genres: Genre[];
  @Input() isEven: boolean;

  getImageUrl (fileName: string): string {
    return `https://image.tmdb.org/t/p/w1280${fileName}`;
  }

}
