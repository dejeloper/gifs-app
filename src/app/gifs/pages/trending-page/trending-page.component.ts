import {AfterViewInit, Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {GiphyService} from '@app/gifs/services/giphy.service';
import {ScrollStateService} from '@app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  giphyService = inject(GiphyService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 900 >= scrollHeight
    this.scrollStateService.setScrollState(scrollTop);

    if (isAtBottom) {
      this.giphyService.loadTreandingGifs();
    }


  }

}
