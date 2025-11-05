import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { reserva } from '../clases/reserva';

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
        console.log('✅ Reservas cargadas:', this.reservas);
      },
      error: (err) => console.error('❌ Error al cargar reservas', err),
    });
  }

  seleccionarReserva(res: reserva): void {
    this.reservaSeleccionada = { ...res };
    this.modoEdicion = true;
  }

  guardarReserva(): void {
    if (!this.reservaSeleccionada) return;

    this.reservaService.createReserva(this.reservaSeleccionada).subscribe({
      next: () => {
        alert('Reserva actualizada correctamente');
        this.modoEdicion = false;
        this.cargarReservas();
      },
      error: (err) => console.error('❌ Error al actualizar reserva', err),
    });
  }

  eliminarReserva(id: string): void {
    if (confirm('¿Seguro que deseas eliminar esta reserva?')) {
      this.reservaService.deleteReserva(id).subscribe({
        next: () => {
          alert('Reserva eliminada correctamente');
          this.cargarReservas();
        },
        error: (err) => console.error('❌ Error al eliminar reserva', err),
      });
    }
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.reservaSeleccionada = null;
  }
}
