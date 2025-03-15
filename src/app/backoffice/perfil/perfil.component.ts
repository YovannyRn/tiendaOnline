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
        const username = (document.getElementById('swal-username') as HTMLInputElement)?.value;
        const oldPassword = (document.getElementById('swal-oldPassword') as HTMLInputElement)?.value;
        const newPassword = (document.getElementById('swal-newPassword') as HTMLInputElement)?.value;

        if (!username || !oldPassword || !newPassword) {
          Swal.showValidationMessage('Todos los campos son obligatorios.');
          return null;
        }

        return { username, oldPassword, newPassword };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { username, oldPassword, newPassword } = result.value;

      
        this.passwordUpdateService.updatePassword(username, oldPassword, newPassword).subscribe({
          next: (response) => {
            if (response.status === 200) {
              Swal.fire({
                title: 'Éxito',
                text: `La contraseña se ha cambiado con éxito.`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: `No se pudo cambiar la contraseña. Código de estado: ${response.status}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (err) => {
            console.error('Error al cambiar la contraseña:', err);
        
            Swal.fire({
              title: 'si es 200 se cambio con exito',
              text: ` Código de estado ->: ${err.status}`,
              icon: 'question',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }
  
  
 } 
