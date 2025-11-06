import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { reserva } from '../clases/reserva';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador-component',
  standalone: false,
  templateUrl: './administrador-component.html',
  styleUrl: './administrador-component.css',
})
export class AdministradorComponent implements OnInit {
  reservas: reserva[] = [];
  reservaSeleccionada: reserva | null = null;
  modoEdicion: boolean = false;

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaService.getAllReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        console.log('Reservas cargadas:', this.reservas);
      },
      error: (err) => console.error('Error al cargar reservas', err),
    });
  }

  seleccionarReserva(res: reserva): void {
    this.reservaSeleccionada = { ...res };
    this.modoEdicion = true;
  }

  guardarReserva(): void {
  if (!this.reservaSeleccionada || !this.reservaSeleccionada.idReserva) return;

  Swal.fire({
    title: '¿Guardar cambios?',
    text: 'Se actualizarán los datos de esta reserva.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, guardar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.reservaService.updateReserva(this.reservaSeleccionada!.idReserva, this.reservaSeleccionada!).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'La reserva se actualizó correctamente.', 'success');
          this.modoEdicion = false;
          this.cargarReservas();
        },
        error: (err) => {
          console.error('Error al actualizar reserva', err);
          Swal.fire('Error', 'No se pudo actualizar la reserva.', 'error');
        }
      });
    }
  });
}


  eliminarReserva(id: string): void {
    Swal.fire({
    title: '¿Seguro quieres eliminar la reserva?',
    text: 'Se eliminara la reserva para siempre.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc3545', 
  }).then((result) => {
    if (result.isConfirmed) {
      this.reservaService.deleteReserva(id).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'La reserva se elimino correctamente.', 'success');
          this.modoEdicion = false;
          this.cargarReservas();
        },
        error: (err) => {
          console.error(' Error al elminar la reserva', err);
          Swal.fire('Error', 'No se pudo eliminar la reserva.', 'error');
        }
      });
    }
  });
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.reservaSeleccionada = null;
  }
}
