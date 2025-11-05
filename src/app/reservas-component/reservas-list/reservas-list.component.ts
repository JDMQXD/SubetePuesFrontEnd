import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {
  reservas: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaService.getAllReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar las reservas';
        this.isLoading = false;
      }
    });
  }

  eliminarReserva(id: string): void {
    this.reservaService.deleteReserva(id).subscribe(() => this.cargarReservas());
  }
}
