import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehiculo } from '../clases/vehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../services/vehiculo.service';
import { AuthService } from '../services/auth.service';
import { reserva } from '../clases/reserva';
import { ServicioService } from '../services/servicio.service';
import { servicio } from '../clases/servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas-component',
  standalone: false,
  templateUrl: './reservas-component.html',
  styleUrl: './reservas-component.css',
})
export class ReservasComponent implements OnInit {
  reservaForm!: FormGroup;
  vehiculo!: Vehiculo;
  idVehiculo!: string;
  cargando = true;
  servicios: servicio[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idVehiculo = this.route.snapshot.paramMap.get('idVehiculo') || '';
    this.crearFormulario();
    this.cargarServicios();


    this.vehiculoService.getVehiculoById(this.idVehiculo).subscribe({
      next: (data) => {
        this.vehiculo = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el vehículo', err);
        this.cargando = false;
      }
    });
    
  }

  crearFormulario(): void {
    this.reservaForm = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      lugarEntrega: ['', [Validators.required, Validators.minLength(3)]],
      servicio:['',Validators.required]
    });
  }

  cargarServicios(): void {
    this.servicioService.getAll().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (err) => {
        console.error('Error al cargar servicios', err);
      }
    });
  }

  enviarReserva(): void {
    const usuario = this.authService.getUser();

    if (!usuario || !usuario.idUsuario) {
      Swal.fire({
        icon: 'error',
        title: 'Sesión expirada',
        text: 'Debes iniciar sesión nuevamente.',
      });
      this.router.navigate(['/login']);
      return;
    }

    const nuevaReserva: any = {
      idReserva: '',
      servicio: { idServicio: this.reservaForm.value.servicio },
      vehiculo: { idVehiculo: this.vehiculo?.idVehiculo },
      usuario: { idUsuario: usuario.idUsuario },
      fechaReserva: new Date(),
      fechaInicio: this.reservaForm.value.fechaInicio,
      fechaFin: this.reservaForm.value.fechaFin,
      lugarEntrega: this.reservaForm.value.lugarEntrega,
    };

    Swal.fire({
      title: '¿Confirmar reserva?',
      text: 'Verifica que los datos sean correctos antes de continuar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, reservar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545', 
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.createReserva(nuevaReserva).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Reserva creada',
              text: 'Tu reserva fue creada exitosamente.',
              confirmButtonColor: '#198754',
              timer: 2500,
              timerProgressBar: true,
            });
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error al crear la reserva:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear la reserva. Intenta de nuevo.',
              confirmButtonColor: '#dc3545',
            });
          },
        });
      }
    });
  }
}