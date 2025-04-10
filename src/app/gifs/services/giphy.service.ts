import {HttpClient} from '@angular/common/http';
import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {environment} from '@environment/environment';
import {GiphyResponse} from '../interfaces/giphy.interface';
import {Gif} from '../interfaces/gif.interface';
import {GifMapper} from '../mapper/gif.mapper';
import {map, Observable, tap} from 'rxjs';

const LOCAL_STORAGE_KEY = 'searchHistory';

const loadGifsFromLocalStorage = (): Record<string, Gif[]> => {
  const searchHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
  return searchHistory ? JSON.parse(searchHistory) : {};
};

@Injectable({providedIn: 'root'})
export class GiphyService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);

  searchHistory = signal<Record<string, Gif[]>>(loadGifsFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTreandingGifs();
  }

  loadTreandingGifs(): void {
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
    });
  }

  searchGifs(search: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: search,
        limit: 20,
        rating: 'g'
      }
    }).pipe(
      map(({data}) => data),
      map(item => GifMapper.mapGiphyItemsToGifArray(item)),
      tap(items =>
        this.searchHistory.update((history) => ({
          ...history,
          [search.toLocaleLowerCase()]: items
        })
        )
      )
    );
  }

  getGifsFromHistory(search: string): Gif[] {
    return this.searchHistory()[search.toLocaleLowerCase()] ?? [];
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(LOCAL_STORAGE_KEY, historyString);
  });
}
