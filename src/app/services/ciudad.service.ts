import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transmision } from '../clases/transmision';
import { Ciudad } from '../clases/ciudad';

@Injectable({ providedIn: 'root' })
export class CiudadService {
  private baseUrl = 'http://localhost:8080/ciudad';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.baseUrl}/all`);
  }
}