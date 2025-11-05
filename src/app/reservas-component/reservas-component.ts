import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehiculo } from '../clases/vehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../services/vehiculo.service';
import { AuthService } from '../services/auth.service';
import { reserva } from '../clases/reserva';

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idVehiculo = this.route.snapshot.paramMap.get('idVehiculo') || '';
    this.crearFormulario();

    // Cargar datos del vehículo seleccionado
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
      lugarEntrega: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  enviarReserva(): void {
    const usuario = this.authService.getUser(); // objeto con idUsuario, nombre, etc.

    if (!usuario || !usuario.idUsuario) {
      alert('No se pudo obtener el usuario. Inicia sesión nuevamente.');
      this.router.navigate(['/login']);
      return;
    }

    // Enviar solo la referencia al vehículo (ajusta el nombre si tu API espera otro)
    const nuevaReserva: any = {
      idReserva: '',
      servicio: undefined,
      // Cambiado a 'vehiculo' en minúscula y enviando solo { idVehiculo: ... }
      vehiculo: { idVehiculo: this.vehiculo?.idVehiculo },
      usuario: { idUsuario: usuario.idUsuario },
      fechaReserva: new Date(),
      fechaInicio: this.reservaForm.value.fechaInicio,
      fechaFin: this.reservaForm.value.fechaFin,
      lugarEntrega: this.reservaForm.value.lugarEntrega
    };

    // DEBUG: ver qué se está enviando exactamente
    console.log('Payload reserva a enviar:', nuevaReserva);

    this.reservaService.createReserva(nuevaReserva).subscribe({
      next: (res) => {
        alert('Reserva creada exitosamente.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al crear la reserva:', err);
        alert('No se pudo crear la reserva.');
      }
    });
  }
}