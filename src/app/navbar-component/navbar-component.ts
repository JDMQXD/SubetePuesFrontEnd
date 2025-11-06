import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  standalone: false,
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  constructor(public router: Router) {}


  get esPaginaVehiculos(): boolean {
    return this.router.url === '/vehiculos';
  }

  get noEsPaginaVehiculos(): boolean {
    return this.router.url !== '/vehiculos';
  }

  volver() {
    this.router.navigate(['../']); 
  }
}
