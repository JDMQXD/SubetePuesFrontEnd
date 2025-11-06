import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getRole();
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (userRole !== expectedRole) {
      Swal.fire({
              icon: 'error',
              title: 'No tienes permisio para acceder a esta sesion',
              text: 'Debes iniciar sesión con una cuenta usuario.',
            });
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
