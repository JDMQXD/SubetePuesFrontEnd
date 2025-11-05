import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../clases/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';

@Component({
  selector: 'app-propietario-component',
  standalone: false,
  templateUrl: './propietario-component.html',
  styleUrl: './propietario-component.css',
})
export class PropietarioComponent implements OnInit{

  vehiculos: Vehiculo[] = [];
  vehiculoSeleccionado: Vehiculo | null = null;
  modoEdicion: boolean = false;

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.vehiculoService.getVehiculosPropietario().subscribe({
      next: (data) => this.vehiculos = data,
      error: (err) => console.error('Error al cargar vehículos', err)
    });
  }

  seleccionarVehiculo(vehiculo: Vehiculo): void {
    this.vehiculoSeleccionado = { ...vehiculo };
    this.modoEdicion = true;
  }

  nuevoVehiculo(): void {
    this.vehiculoSeleccionado = new Vehiculo();
    this.modoEdicion = true;
  }

  guardarVehiculo(): void {
    if (!this.vehiculoSeleccionado) return;

    if (this.vehiculoSeleccionado.idVehiculo) {
      // actualizar
      this.vehiculoService.actualizarVehiculo(this.vehiculoSeleccionado.idVehiculo, this.vehiculoSeleccionado)
        .subscribe({
          next: () => {
            this.cargarVehiculos();
            this.cancelar();
          },
          error: (err) => console.error('Error al actualizar', err)
        });
    } else {
      // crear
      this.vehiculoService.crearVehiculo(this.vehiculoSeleccionado)
        .subscribe({
          next: () => {
            this.cargarVehiculos();
            this.cancelar();
          },
          error: (err) => console.error('Error al crear', err)
        });
    }
  }

  eliminarVehiculo(id: string): void {
    if (confirm('¿Seguro que deseas eliminar este vehículo?')) {
      this.vehiculoService.eliminarVehiculo(id).subscribe({
        next: () => this.cargarVehiculos(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.vehiculoSeleccionado = null;
  }
}
