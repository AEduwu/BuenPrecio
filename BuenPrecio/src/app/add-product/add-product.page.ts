import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { GeoService } from '../geo-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
  standalone: false,
})
export class AddProductPage {
  newProduct = {
    name: '',
    price: null,
    location: '',
    description: '',
    address: '',
    image: ''
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private alertController: AlertController, private geoService: GeoService) {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.imagePreview = image.dataUrl ?? null;
    this.newProduct.image = image.dataUrl ?? '';
  }

async getLocation() {
  try {
      const coordinates = await Geolocation.getCurrentPosition({
        timeout: 20000,
        enableHighAccuracy: true
      });
    const { latitude, longitude } = coordinates.coords;

    this.geoService.reverseGeocode(latitude, longitude).subscribe({
      next: (address: string) => {
        this.newProduct.address = address;
      },
      error: async () => {
        await this.showAlert('Error al convertir la ubicación a dirección.');
        this.newProduct.address = `${latitude}, ${longitude}`;
      }
    });
  } catch (error) {
    await this.showAlert('No se pudo obtener la ubicación. Asegúrate de tener la ubicación activada.');
  }
}

  async saveProduct() {
    const { name, price, address, description, image } = this.newProduct;

    if (!name || price == null || !address || !description || !image) {
      await this.showAlert('Por favor, completa todos los campos e incluye una imagen y la ubicación.');
      return;
    }

    if (price < 0) {
      await this.showAlert('El precio no puede ser negativo.');
      return;
    }

    await this.showAlert('Oferta publicada ✅');

    this.newProduct = {
      name: '',
      price: null,
      location: '',
      description: '',
      address: '',
      image: ''
    };
    this.imagePreview = null;
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
