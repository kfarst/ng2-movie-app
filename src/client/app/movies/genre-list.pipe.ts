import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../shared/genre/index';

import 'rxjs/operator/find';
import 'rxjs/operator/map';

@Pipe({name: 'genreList'})
export class GenreListPipe implements PipeTransform {
  transform(genres: number[], list: Genre[]): string {
    return genres.map(genre_id => {
      return list.find(genre => genre.id == genre_id).name;
    }).join(', ');
  }
}
