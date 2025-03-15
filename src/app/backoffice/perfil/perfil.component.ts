import { Component, OnInit } from '@angular/core';
import { TabPerfilHeaderComponent } from '../tabs/tab-perfil-header/tab-perfil-header.component';
import { TokenService } from '../../services/auth/token.service';
import { NgIf } from '@angular/common';
import { UserInfoServiceService } from '../../services/auth/user-info-service.service';
import { UserInfo } from '../../services/interfaces/user-info';
import { PopupService } from '../../services/utils/popup.service';
import { PasswordUpdateService } from '../../services/auth/password-update.service';
import Swal from 'sweetalert2';
import { tokenInterceptor } from '../../services/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordI } from '../../services/interfaces/password';


@Component({
  selector: 'app-perfil',
  imports: [TabPerfilHeaderComponent, NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  providers: [
    { provide: HTTP_INTERCEPTORS, useFactory: tokenInterceptor, multi: true } // Proveer el interceptor
  ]
})
 export class PerfilComponent implements OnInit{
  
  userInfo: UserInfo | null = null;

  constructor(
    private userInfoService: UserInfoServiceService,
    private tokenService: TokenService,
    private popupService: PopupService,
    private passwordUpdateService: PasswordUpdateService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const userId = 1; 
    this.userInfoService.getUserInfo(userId).subscribe({
      next: (data) => {
        this.userInfo = data;
      },
      error: (err) => {
        console.error('Error al obtener la información del usuario:', err);
      }
    });
  }

  openChangePasswordPopup(): void {
    Swal.fire({
      title: 'Cambiar Contraseña',
      html: `
        <input id="swal-username" class="swal2-input" placeholder="Nombre de Usuario" type="text">
        <input id="swal-oldPassword" class="swal2-input" placeholder="Contraseña Actual" type="password">
        <input id="swal-newPassword" class="swal2-input" placeholder="Nueva Contraseña" type="password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const username = (document.getElementById('swal-username') as HTMLInputElement)?.value.trim();
        const oldPassword = (document.getElementById('swal-oldPassword') as HTMLInputElement)?.value.trim();
        const newPassword = (document.getElementById('swal-newPassword') as HTMLInputElement)?.value.trim();
  
        if (!username || !oldPassword || !newPassword) {
          Swal.showValidationMessage('Todos los campos son obligatorios.');
          return null;
        }

        return { username, oldPassword, newPassword } as PasswordI;  // Se usa la interfaz aquí
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const passwordData: PasswordI = result.value;
  
        this.passwordUpdateService.updatePassword(passwordData).subscribe({
          next: () => {
            Swal.fire({
              title: 'Éxito',
              text: 'La contraseña se ha cambiado con éxito.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          error: (err) => {
            let errorMessage = 'No se pudo cambiar la contraseña.';
            if (err.status === 400) {
              errorMessage = 'Error: Datos incorrectos o formato inválido.';
            } else if (err.status === 401) {
              errorMessage = 'Error: No autorizado. Verifique sus credenciales.';
            } else if (err.status === 500) {
              errorMessage = 'Error del servidor. Intente nuevamente más tarde.';
            }
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }
  
 } 
