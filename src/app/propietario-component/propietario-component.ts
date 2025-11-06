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
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

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
    private disponibilidadService: DisponibilidadService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    console.log('TOKEN ENVIADO:', localStorage.getItem('rol'));
    this.vehiculoService.getVehiculosPropietario().subscribe({
      next: (data) => (this.vehiculos = data),
      error: (err) => console.error('Error al cargar vehículos', err),
    });
  }

  nuevoVehiculo(): void {
  this.vehiculoSeleccionado = {
    idVehiculo: '',
    marca: '',
    modelo: '',
    transmision: new Transmision(),
    tipoVehiculo: new TipoVehiculo(),
    ubicacion: new Ciudad(),
    disponibilidad: new Disponibilidad()
  } as Vehiculo;
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

  const fechaActual = new Date();

  const usuarioData = localStorage.getItem('usuario');
  const usuarioParseado = usuarioData ? JSON.parse(usuarioData) : null;
  const idUsuario = usuarioParseado?.idUsuario || '';

  if (!idUsuario) {
    console.error('No se encontró el ID del usuario en el localStorage');
    return;
  }

  const vehiculoAEnviar: Vehiculo = {
    ...this.vehiculoSeleccionado,
    idVehiculo: this.vehiculoSeleccionado.idVehiculo || '',
    especificacion: this.vehiculoSeleccionado.especificacion,
    fechaRegistro: fechaActual,
    usuario: {
      idUsuario: idUsuario
    } as any
  };

  console.log('nviando vehículo:', vehiculoAEnviar);

  Swal.fire({
      title: '¿Seguro quieres guardar el vehiculo?',
      text: 'Revisa los datos primero!.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545', 
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.crearVehiculo(vehiculoAEnviar).subscribe({
          next: () => {
            Swal.fire('guardado', 'El vehiculo se guardo correctamente', 'success');
            this.cargarVehiculos();
            this.cancelar();
          },
          error: (err) => {
            console.error(' Error al elminar la reserva', err);
            Swal.fire('Error', 'No se pudo guardar el vehiculo.', 'error');
          }
        });
      }
    });
  
}





  eliminarVehiculo(idVehiculo: string): void {
    
    Swal.fire({
      title: '¿Seguro quieres eliminar el vehiculo?',
      text: 'Se eliminara el vehiculo para siempre.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545', 
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.eliminarVehiculo(idVehiculo).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El vehiculo se elimino correctamente.', 'success');
            this.cargarVehiculos();
          },
          error: (err) => {
            console.error(' Error al elminar el vehiculo', err);
            Swal.fire('Error', 'No se pudo eliminar el vehiculo.', 'error');
          }
        });
      }
    });
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.vehiculoSeleccionado = null;
  }
}
