import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getAllReservas().subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Error al obtener reservas:', err)
    });
  }
}
