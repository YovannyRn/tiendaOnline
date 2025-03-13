import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header-cliente',
  imports: [RouterLink, NgIf],
  standalone: true,
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.scss'
})
export class HeaderClienteComponent {
  
  isLoggedIn: boolean = false;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.checkSession();
  }

  checkSession(): void {
    this.isLoggedIn = this.tokenService.getAccessToken() !== null; // Usa TokenService en lugar de sessionStorage
  }

  logout(): void {
    this.tokenService.removeToken(); // Usa TokenService para borrar el token
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
