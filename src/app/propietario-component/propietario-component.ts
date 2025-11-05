import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../clases/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import { TransmisionService } from '../services/transmision.service';
import { TipoVehiculoService } from '../services/tipoVehiculo.service';
import { CiudadService } from '../services/ciudad.service';
import { DisponibilidadService } from '../services/disponibilidad.service';
import { Transmision } from '../clases/transmision';
import { TipoVehiculo } from '../clases/tipoVehiculo';
import { Ciudad } from '../clases/ciudad';
import { Disponibilidad } from '../clases/disponibilidad';

@Component({
  selector: 'app-propietario-component',
  standalone: false,
  templateUrl: './propietario-component.html',
  styleUrl: './propietario-component.css',
})
export class PropietarioComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  vehiculoSeleccionado: Vehiculo | null = null;
  modoEdicion: boolean = false;

  transmisiones: Transmision[] = [];
  tiposVehiculo: TipoVehiculo[] = [];
  ciudades: Ciudad[] = [];
  disponibilidades: Disponibilidad[] = [];

  constructor(
    private vehiculoService: VehiculoService,
    private transmisionService: TransmisionService,
    private tipoVehiculoService: TipoVehiculoService,
    private ciudadService: CiudadService,
    private disponibilidadService: DisponibilidadService
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.vehiculoService.getVehiculosPropietario().subscribe({
      next: (data) => (this.vehiculos = data),
      error: (err) => console.error('Error al cargar vehículos', err),
    });
  }

  nuevoVehiculo(): void {
    this.vehiculoSeleccionado = new Vehiculo();
    this.modoEdicion = true;
    this.cargarListas();
  }

  seleccionarVehiculo(vehiculo: Vehiculo): void {
    this.vehiculoSeleccionado = { ...vehiculo };
    this.modoEdicion = true;
    this.cargarListas();
  }

  cargarListas(): void {
    this.transmisionService.getAll().subscribe((data) => (this.transmisiones = data));
    this.tipoVehiculoService.getAll().subscribe((data) => (this.tiposVehiculo = data));
    this.ciudadService.getAll().subscribe((data) => (this.ciudades = data));
    this.disponibilidadService.getAll().subscribe((data) => (this.disponibilidades = data));
  }

  guardarVehiculo(): void {
    if (!this.vehiculoSeleccionado) return;

    // Solo enviar los IDs, no los objetos completos
    this.vehiculoSeleccionado.transmision = { idTransmision: this.vehiculoSeleccionado.transmision.idTransmision } as Transmision;
    this.vehiculoSeleccionado.tipoVehiculo = { idTipoVehiculo: this.vehiculoSeleccionado.tipoVehiculo.idTipoVehiculo } as TipoVehiculo;
    this.vehiculoSeleccionado.ubicacion = { idCiudad: this.vehiculoSeleccionado.ubicacion.idCiudad } as Ciudad;
    this.vehiculoSeleccionado.disponibilidad = { idDisponibilidad: this.vehiculoSeleccionado.disponibilidad.idDisponibilidad } as Disponibilidad;

    if (this.vehiculoSeleccionado.idVehiculo) {
      // actualizar
      this.vehiculoService.actualizarVehiculo(this.vehiculoSeleccionado.idVehiculo, this.vehiculoSeleccionado).subscribe({
        next: () => {
          this.cargarVehiculos();
          this.cancelar();
        },
        error: (err) => console.error('Error al actualizar', err),
      });
    } else {
      // crear
      this.vehiculoService.crearVehiculo(this.vehiculoSeleccionado).subscribe({
        next: () => {
          this.cargarVehiculos();
          this.cancelar();
        },
        error: (err) => console.error('Error al crear', err),
      });
    }
  }

  eliminarVehiculo(idVehiculo: string): void {
    if (confirm('¿Seguro que deseas eliminar este vehículo?')) {
      this.vehiculoService.eliminarVehiculo(idVehiculo).subscribe({
        next: () => {
          alert('Vehículo eliminado correctamente');
          this.cargarVehiculos();
        },
        error: (err) => {
          console.error('Error al eliminar vehículo', err);
          alert('Error al eliminar vehículo');
        },
      });
    }
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.vehiculoSeleccionado = null;
  }
}
