import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StyleService } from 'src/app/core/services/style.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  constructor(
    private router: Router,
    public styleService: StyleService,
  ) { }

  ngOnInit() {}

  navigate(path: string, prepath?: string) {
    this.styleService.closeSidemenu();
    if (path === 'home') {
      this.router.navigate(['/']);
    } else if (prepath) {
      this.router.navigate([`${prepath}/${path}`]);
    } else {
      this.router.navigate([`${path}`]);
    }
  }

  closeSidemenu() { 
    this.styleService.closeSidemenu();
  }
}
