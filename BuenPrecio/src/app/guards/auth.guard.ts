import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.storage.create();
    const session = await this.storage.get('session');
    if (session) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
