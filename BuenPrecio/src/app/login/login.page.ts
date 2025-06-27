import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';

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
    private dbService: DbserviceService
  ) {}

  async login() {
    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Por favor completa todos los campos.';
      return;
    }

    const user = await this.dbService.login(this.email, this.password);

    if (user) {
      console.log('Usuario autenticado:', user);

      this.router.navigateByUrl('/home');
    } else {
      this.errorMsg = 'Correo o contraseña incorrectos.';
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
