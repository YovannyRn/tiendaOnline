import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UseSatateService {

  private readonly USER_KEY = 'tienda_user'

  constructor() { }

  save(username: string, role: string){
    sessionStorage.setItem(this.USER_KEY,JSON.stringify({username,role}));
  }

  getUsername(): string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }

    return session.role;
  }

  getRole(): string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }

    return session.role;
  }

  remove(){
    sessionStorage.removeItem(this.USER_KEY);
  }
}
