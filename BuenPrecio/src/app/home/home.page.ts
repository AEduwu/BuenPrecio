import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user: any = null;
  offers: any[] = [];

  constructor(
    private storage: Storage,
    private router: Router,
    private dbService: DbserviceService
  ) {}

async ionViewWillEnter() {
  await this.storage.create();
  this.user = await this.storage.get('session');

  await this.loadOffers();
}

async loadOffers() {
  this.offers = await this.dbService.getAllOffers();
}

  async logout() {
    await this.storage.remove('session');
    this.router.navigateByUrl('/login');
  }


  
}
