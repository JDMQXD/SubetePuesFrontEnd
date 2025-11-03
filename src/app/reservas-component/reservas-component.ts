import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-reservas-component',
  standalone: false,
  templateUrl: './reservas-component.html',
  styleUrl: './reservas-component.css',
})
export class ReservasComponent implements OnInit {
  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    this.reservaService.getAllReservas().subscribe(data => console.log(data));
  }
}
