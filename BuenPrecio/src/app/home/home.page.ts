import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user: any = null;

  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    await this.storage.create();
    this.user = await this.storage.get('session');
  }

  async logout() {
    await this.storage.remove('session');
    this.router.navigateByUrl('/login');
  }
}
