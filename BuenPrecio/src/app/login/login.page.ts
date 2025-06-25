import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

  login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password = this.password;

    if (!emailRegex.test(this.email)) {
      this.errorMsg = 'Ingrese un email válido.';
      return;
    }

    if (
      password.length < 4 ||
      password.length > 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      this.errorMsg =
        'La contraseña debe tener entre 4 y 8 caracteres, incluir al menos una letra mayúscula, una minúscula y un número.';
      return;
    }

    this.errorMsg = '';
    this.router.navigateByUrl('/home');
  }

    goToRegister() {
    this.router.navigateByUrl('/register');
  }

}
