import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string; // correo o idUsuario, según lo que guardes
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { correo, password })
      .pipe(
        tap((response: any) => {
          // Guardar el token en localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('rol', response.rol);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('rol');
  }
  getUser(): any | null {
  const userData = localStorage.getItem('usuario');
  return userData ? JSON.parse(userData) : null;
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenerUsuarioDelToken(): TokenPayload | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode<TokenPayload>(token);
    } catch (e) {
      console.error('Error al decodificar token', e);
      return null;
    }
  }

}
