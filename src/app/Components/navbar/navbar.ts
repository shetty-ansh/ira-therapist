import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: false
})
export class Navbar {
  title = 'Ira - Virtual Assistant';

  activeIndex: number = 0;

setActive(index: number, event: Event) {
  event.stopPropagation();
  this.activeIndex = index;
}


}
