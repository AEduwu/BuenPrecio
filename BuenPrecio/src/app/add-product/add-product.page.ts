import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  constructor(private alertController: AlertController) {}

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.newProduct.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

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

  async saveProduct() {
    const { name, price, address, description, image } = this.newProduct;

    if (!name || price == null || !address || !description || !image) {
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
