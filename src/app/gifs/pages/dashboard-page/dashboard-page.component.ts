import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideMenuComponent} from '@app/gifs/components/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent { }
