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

  // ✅ Recuperar el usuario del localStorage
  const usuarioData = localStorage.getItem('usuario');
  const usuarioParseado = usuarioData ? JSON.parse(usuarioData) : null;
  const idUsuario = usuarioParseado?.idUsuario || '';

  if (!idUsuario) {
    console.error('No se encontró el ID del usuario en el localStorage');
    return;
  }

  // ✅ Construir el objeto con los datos completos
  const vehiculoAEnviar: Vehiculo = {
    ...this.vehiculoSeleccionado,
    idVehiculo: this.vehiculoSeleccionado.idVehiculo || '',
    especificacion: this.vehiculoSeleccionado.especificacion,
    fechaRegistro: fechaActual,
    usuario: {
      idUsuario: idUsuario
    } as any
  };

  console.log('🚗 Enviando vehículo:', vehiculoAEnviar);

  this.vehiculoService.crearVehiculo(vehiculoAEnviar).subscribe({
    next: () => {
      alert('Vehículo creado correctamente');
      this.cargarVehiculos();
      this.cancelar();
    },
    error: (err) => console.error('❌ Error al crear vehículo', err),
  });
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
