import { Component } from '@angular/core';
import { SidebarStatusService } from '../../services/status/sidebar-status.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { PopupService } from '../../services/utils/popup.service';
import { UseSatateService } from '../../services/auth/use-satate.service';
import Swal from 'sweetalert2';
import { PasswordUpdateService } from '../../services/auth/password-update.service';
import { PasswordI } from '../../services/interfaces/password';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isActiveMenuHeader: boolean = true;
  constructor(
    private sidebarStatusService: SidebarStatusService,
    private tokenService: TokenService,
    private popupService: PopupService,
    private userStateService: UseSatateService,
    private passwordUpdateService: PasswordUpdateService,
    private router: Router,
  )
  {}

  ngOnInit(): void {
    this.sidebarStatusService.status$.subscribe(status => {
      this.isActiveMenuHeader = status;
    })
  }

  closeSession(): void {
    this.popupService.loader(
      "Cerrando sesión",
      "Vuelva pronto"
    );

    this.tokenService.removeToken();
    this.userStateService.removeSession()
    setTimeout(() => {
      this.popupService.close()
      this.router.navigate(['/login']);
    }, 1500)
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
