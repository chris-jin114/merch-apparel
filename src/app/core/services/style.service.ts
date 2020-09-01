import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  constructor() {}

  openSidemenu() {
    document.getElementById('mySidebar').style.width = '320px';
    document.getElementById('mySidebar').style.borderWidth = '1px';
    document.getElementById('closeMenu').style.display = 'block';
    document.getElementById('sidebar-overlay').style.display = 'block';
  }

  closeSidemenu() {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('mySidebar').style.borderWidth = '0';
    document.getElementById('closeMenu').style.display = 'none';
    document.getElementById('sidebar-overlay').style.display = 'none';
  }

}
