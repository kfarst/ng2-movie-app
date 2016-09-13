import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from '../favorites/index';
import { Subscription } from 'rxjs/Subscription';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent implements OnInit, OnDestroy {
  sub: Subscription;
  favoritesCount: number = 0;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.sub = this.favoritesService.
      subscribe(favoritesCount => this.favoritesCount = favoritesCount);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

