import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from '../auth/token.service';
import { PasswordI } from '../interfaces/password';


@Injectable({
  providedIn: 'root'
})
export class PasswordUpdateService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  updatePassword(data: PasswordI): Observable<any> {
    const token = this.tokenService.getAccessToken();
    if (!token) {
      console.error('Error: Token de autenticación no encontrado.');
      return throwError(() => new Error('No authentication token found.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${environment.apiUrl}/password/update`, data, { headers });
  }
}
