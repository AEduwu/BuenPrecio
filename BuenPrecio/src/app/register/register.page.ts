import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {

  email: string = '';
  fullname: string = '';
  password: string = '';
  confirmPassword: string = '';
  region: string | undefined;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private router: Router) {}

  register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.errorMsg = '';
    this.successMsg = '';

    if (!emailRegex.test(this.email)) {
      this.errorMsg = 'Por favor ingresa un correo válido.';
      return;
    }

    if (!this.fullname.trim()) {
      this.errorMsg = 'El nombre no puede estar vacío.';
      return;
    }

    if (
      this.password.length < 4 ||
      this.password.length > 8 ||
      !/[A-Z]/.test(this.password) ||
      !/[a-z]/.test(this.password) ||
      !/[0-9]/.test(this.password)
    ) {
      this.errorMsg =
        'La contraseña debe tener entre 4 y 8 caracteres e incluir al menos una mayúscula, una minúscula y un número.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.region) {
      this.errorMsg = 'Debe seleccionar una región.';
      return;
    }

    this.successMsg = '¡Registro correcto! Redirigiendo al login...';

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
  }

  clearFields() {
    this.email = '';
    this.fullname = '';
    this.password = '';
    this.confirmPassword = '';
    this.region = undefined;
    this.errorMsg = '';
    this.successMsg = '';
  }
}

