import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehiculo } from '../clases/vehiculo';

// 🔹 Ajusta esta clase según tu modelo de dominio


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  // Cambia esta URL si tu backend corre en otro puerto o tiene otro prefijo
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // 🧩 Método para obtener el token JWT guardado
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // El token se guarda al iniciar sesión
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // 🟢 Obtener todos los vehículos
  getAllVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.baseUrl}/`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Vehiculo[]>('getAllVehiculos', [])));
  }

  // 🟢 Obtener un vehículo por ID
  getVehiculoById(id: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Vehiculo>('getVehiculoById')));
  }

  // 🟢 Crear un nuevo vehículo
  crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.baseUrl}/propietario/crear`, vehiculo, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Vehiculo>('crearVehiculo')));
  }

  // 🟢 Actualizar vehículo
  actualizarVehiculo(id: string, vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.baseUrl}/propietario/update/${id}`, vehiculo, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Vehiculo>('actualizarVehiculo')));
  }

  // 🟢 Eliminar vehículo
  eliminarVehiculo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/propietario/eliminar/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<void>('eliminarVehiculo')));
  }

  // ⚠️ Manejo genérico de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, error);
      return new Observable<T>(observer => {
        observer.next(result as T);
        observer.complete();
      });
    };
  }
}
