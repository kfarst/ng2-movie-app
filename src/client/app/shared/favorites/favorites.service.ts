import { Injectable, EventEmitter  } from '@angular/core';

@Injectable()
export class FavoritesService extends EventEmitter<number> { }
