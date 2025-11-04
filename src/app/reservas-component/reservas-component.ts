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
  const usuario = this.authService.getUser(); // ✅ ahora es un objeto con idUsuario, nombre, etc.

  if (!usuario || !usuario.idUsuario) {
    alert('No se pudo obtener el usuario. Inicia sesión nuevamente.');
    this.router.navigate(['/login']);
    return;
  }

  const nuevaReserva: reserva = {
    idReserva: '',
    servicio: undefined as any, // o puedes asignarlo si ya lo tienes
    Vehiculo: this.vehiculo, // asegúrate de recibirlo desde detalle-vehiculo
    usuario: { idUsuario: usuario.idUsuario } as any, // 👈 solo se envía el ID
    fechaReserva: new Date(),
    fechaInicio: this.reservaForm.value.fechaInicio,
    fechaFin: this.reservaForm.value.fechaFin,
    lugarEntrega: this.reservaForm.value.lugarEntrega
  };

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
