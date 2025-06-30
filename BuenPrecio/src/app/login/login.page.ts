import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(
  private router: Router,
  private dbService: DbserviceService,
  private storage: Storage
) {
  this.initStorage();
}

async initStorage() {
  await this.storage.create();
}

async login() {
  this.errorMsg = '';

  if (!this.email || !this.password) {
    this.errorMsg = 'Por favor completa todos los campos.';
    return;
  }

  const user = await this.dbService.login(this.email, this.password);

  if (user) {
    this.dbService.setCurrentUser(user);
    await this.storage.set('session', user);
    this.router.navigateByUrl('/home');
  } else {
    this.errorMsg = 'Correo o contraseña incorrectos.';
  }
}

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
