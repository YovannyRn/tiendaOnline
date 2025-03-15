import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../auth/token.service'; // Asegúrate de importar el TokenService

@Injectable({
  providedIn: 'root'
})
export class PasswordUpdateService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  updatePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    const updatePasswordRequest = { username, oldPassword, newPassword };

    const token = this.tokenService.getAccessToken();
    console.log('Token obtenido:', token);
    if (!token) {
      console.error('No se encontró el token en las cookies.');
      throw new Error('No authentication token found.');
    }


    const headers = new HttpHeaders({
      
      'Authorization': `Bearer ${token}`
    });


    return this.http.post(
      `${environment.apiUrl}/password/update`,
      updatePasswordRequest,
      { headers }
    );
  }
}