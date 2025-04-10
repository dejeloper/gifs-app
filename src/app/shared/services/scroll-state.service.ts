import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {
  trendingScrollState = signal(0);

  setScrollState(scrollTop: number): void {
    this.trendingScrollState.set(scrollTop);
  }

}
