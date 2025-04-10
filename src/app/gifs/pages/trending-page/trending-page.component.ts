import {Component, computed, inject, signal} from '@angular/core';
import {GifListComponent} from '@app/gifs/components/gif-list/gif-list.component';
import {GiphyService} from '@app/gifs/services/giphy.service';



@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {

  giphyService = inject(GiphyService);


}
