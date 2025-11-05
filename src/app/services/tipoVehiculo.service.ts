import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transmision } from '../clases/transmision';
import { TipoVehiculo } from '../clases/tipoVehiculo';

@Injectable({ providedIn: 'root' })
export class TipoVehiculoService {
  private baseUrl = 'http://localhost:8080/tipoVehiculo';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(`${this.baseUrl}/all`);
  }
}