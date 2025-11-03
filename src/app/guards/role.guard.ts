import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getRole();
    const token = this.authService.getToken();

    // Si no está logueado
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Si el rol no coincide
    if (userRole !== expectedRole) {
      alert('No tienes permisos para acceder a esta sección');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
