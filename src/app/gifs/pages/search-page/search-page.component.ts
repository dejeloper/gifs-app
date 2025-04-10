import {Component, inject, signal} from '@angular/core';
import {GifListComponent} from "../../components/gif-list/gif-list.component";
import {GiphyService} from '@app/gifs/services/giphy.service';
import {Gif} from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  giphyService = inject(GiphyService);
  gifsSearch = signal<Gif[]>([]);

  onSearch(search: string) {
    this.giphyService.searchGifs(search).subscribe((response) => {
      this.gifsSearch.set(response);
    });
  }
}
