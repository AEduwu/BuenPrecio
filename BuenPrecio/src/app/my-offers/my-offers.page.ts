import { Component } from '@angular/core';
import { DbserviceService } from '../dbservice.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.page.html',
  styleUrls: ['./my-offers.page.scss'],
  standalone: false,
})
export class MyOffersPage {
  userEmail: string = '';
  offers: any[] = [];

  constructor(
    private dbService: DbserviceService,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.storage.create();
    const user = await this.storage.get('session');
    this.userEmail = user?.email;

    await this.loadOffers();
  }

  async loadOffers() {
    if (this.userEmail) {
      this.offers = await this.dbService.getOffersByUser(this.userEmail);
    }
  }

  async deleteOffer(num_offer: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar esta oferta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const success = await this.dbService.deleteOffer(num_offer);
            if (success) {
              await this.loadOffers();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}