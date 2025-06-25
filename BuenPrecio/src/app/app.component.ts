import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private menuController: MenuController, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const noMenuPages = ['/login', '/register'];

        if (noMenuPages.includes(event.url)) {
          this.menuController.enable(false);
          this.menuController.close();
        } else {
          this.menuController.enable(true);
        }
      }
    });
  }

  closeMenu() {
    this.menuController.close();
  }
}
