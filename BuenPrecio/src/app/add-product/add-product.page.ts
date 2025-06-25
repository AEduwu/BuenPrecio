import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  };

  selectedImageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private alertController: AlertController) {}

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProduct() {
    const { name, price, address, description } = this.newProduct;

    if (!name || price === null || price === undefined || !address || !description || !this.selectedImageFile) {
      await this.showAlert('Por favor, completa todos los campos e incluye una imagen.');
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
    };
    this.selectedImageFile = null;
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
