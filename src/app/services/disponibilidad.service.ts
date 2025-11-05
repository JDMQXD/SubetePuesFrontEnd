import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transmision } from '../clases/transmision';
import { Disponibilidad } from '../clases/disponibilidad';

@Injectable({ providedIn: 'root' })
export class DisponibilidadService {
  private baseUrl = 'http://localhost:8080/disponibilidad';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Disponibilidad[]> {
    return this.http.get<Disponibilidad[]>(`${this.baseUrl}/all`);
  }
}