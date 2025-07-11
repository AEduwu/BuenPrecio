import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private menuController: MenuController,
    private router: Router,
    private storage: Storage
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const noMenuPages = ['/login', '/register'];

        if (noMenuPages.some(page => event.url.startsWith(page))) {
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

  async logout() {
    await this.storage.remove('session');
    await this.menuController.close();
    this.router.navigateByUrl('/login');
  }

  async goHome() {
  await this.menuController.close();
  this.router.navigateByUrl('/home', { replaceUrl: true });
}
}
