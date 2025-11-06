import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { servicio } from '../clases/servicio';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private baseUrl = 'http://localhost:8080/servicio';

  constructor(private http: HttpClient) {}

  getAll(): Observable<servicio[]> {
    return this.http.get<servicio[]>(`${this.baseUrl}/all`);
  }
}