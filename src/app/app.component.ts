import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { StyleService } from './core/services/style.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'arena',
  templateUrl: 'app.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  currentPage: string;
  routerSubs: Subscription;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public styleService: StyleService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }
}
