import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',

})
export class LoginComponent {
  correo = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.correo, this.password).subscribe({
      next: (res) => {
        const role = this.authService.getRole();

        // Redirigir según rol
        switch (role) {
          case 'ROLE_USER':
            this.router.navigate(['/reservas']);
            break;
          case 'ROLE_PROPIETARIO':
            this.router.navigate(['/propietarios']);
            break;
          default:
            alert('Rol no autorizado');
            this.authService.logout();
            this.router.navigate(['/login']);
            break;
        }
      },
      error: (err) => {
        alert('Credenciales incorrectas');
        console.error(err);
      }
    });
  }
}
