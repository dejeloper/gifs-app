import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {GifListComponent} from '@app/gifs/components/gif-list/gif-list.component';
import {GiphyService} from '@app/gifs/services/giphy.service';
import {map} from 'rxjs';

@Component({
  selector: 'gif-history',
  imports: [GifListComponent],
  templateUrl: './history.component.html',
})
export default class HistoryComponent {
  gifService = inject(GiphyService);

  search = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['search'])
    )
  )

  gifBySearch = computed(() => this.gifService.getGifsFromHistory(this.search()))
}
