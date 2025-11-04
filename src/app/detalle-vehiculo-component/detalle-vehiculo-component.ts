import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../services/vehiculo.service';
import { Vehiculo } from '../clases/vehiculo';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detalle-vehiculo-component',
  standalone: false,
  templateUrl: './detalle-vehiculo-component.html',
  styleUrl: './detalle-vehiculo-component.css',
})
export class DetalleVehiculoComponent implements OnInit {

  vehiculo: Vehiculo | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vehiculoService.getVehiculoById(id).subscribe({
        next: (data) => {
          this.vehiculo = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar el vehículo:', error);
          this.error = 'No se pudo cargar la información del vehículo.';
          this.loading = false;
        }
      });
    }
  }

  reservarVehiculo(): void {
  const token = this.authService.getToken();
  const role = this.authService.getRole();

  if (token && role === 'ROLE_USER') {
    this.router.navigate(['/reservas', this.vehiculo?.idVehiculo]); // ✅ pasa el ID del vehículo
  } else {
    alert('Debes iniciar sesión como usuario para hacer una reserva.');
    this.router.navigate(['/login']);
  }
}



}
