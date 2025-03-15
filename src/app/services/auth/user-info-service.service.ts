import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoServiceService {

  constructor(private http: HttpClient) { }

  getUserInfo(userId: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.apiUrl}/user-info/${userId}`);
  }
}
