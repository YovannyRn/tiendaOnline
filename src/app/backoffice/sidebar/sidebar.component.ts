import { Component } from '@angular/core';
import { SidebarStatusService } from '../../services/status/sidebar-status.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { PopupService } from '../../services/utils/popup.service';
import { UseSatateService } from '../../services/auth/use-satate.service';
import Swal from 'sweetalert2';
import { PasswordUpdateService } from '../../services/auth/password-update.service';



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
