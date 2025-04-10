import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {environment} from '@environment/environment';
import {GiphyResponse} from '../interfaces/giphy.interface';
import {Gif} from '../interfaces/gif.interface';
import {GifMapper} from '../mapper/gif.mapper';


@Injectable({providedIn: 'root'})
export class GiphyService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);

  constructor() {
    this.loadTreandingGifs();
  }

  loadTreandingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        rating: 'g'
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log(this.trendingGifs())
    });
  }
}
