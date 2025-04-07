import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

interface MenuOptions {
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}


@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  menuOptions: MenuOptions[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Pupulares',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line',
    },
    {
      label: 'Buscar',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass',
    },
  ];

}
