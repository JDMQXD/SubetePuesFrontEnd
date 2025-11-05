import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transmision } from '../clases/transmision';

@Injectable({ providedIn: 'root' })
export class TransmisionService {
  private baseUrl = 'http://localhost:8080/transmision';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transmision[]> {
    return this.http.get<Transmision[]>(`${this.baseUrl}/all`);
  }
}
