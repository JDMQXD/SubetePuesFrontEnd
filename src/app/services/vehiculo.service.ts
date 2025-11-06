import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehiculo } from '../clases/vehiculo';



@Injectable({
  providedIn: 'root'
})
export class VehiculoService {


  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  getAllVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.baseUrl}/`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Vehiculo[]>('getAllVehiculos', [])));
  }

  getVehiculoById(id: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Vehiculo>('getVehiculoById')));
  }


  crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.baseUrl}/propietario/crear`, vehiculo, { 
      headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Vehiculo>('crearVehiculo')));
  }


  actualizarVehiculo(id: string, vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.baseUrl}/propietario/update/${id}`, vehiculo, { 
      headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Vehiculo>('actualizarVehiculo')));
  }


  eliminarVehiculo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/propietario/eliminar/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<void>('eliminarVehiculo')));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, error);
      return new Observable<T>(observer => {
        observer.next(result as T);
        observer.complete();
      });
    };
  }

  getVehiculosPropietario(): Observable<Vehiculo[]> {
  return this.http.get<Vehiculo[]>(`${this.baseUrl}/propietario/vehiculos`, {
    headers: this.getAuthHeaders()
  });
}

}
