import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/';

 constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllReservas(): Observable<any> {
    return this.http.get(`${this.apiUrl}admin/all`);
  }

  getReservaById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}user/reserva/${id}`);
  }

  createReserva(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}user/reserva`, data);
  }

  deleteReserva(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}admin/${id}`);
  }
}
