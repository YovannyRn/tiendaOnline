import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CredentialsService } from '../../services/auth/credentials.service';
import { UserInterface } from '../../services/interfaces/auth';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-registro',
  imports: [RouterLink,ReactiveFormsModule],
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.credentialsService.register(this.registerForm.value as UserInterface).subscribe({
      next: (data) => {
        // Mostrar el mensaje de éxito
        this.popupService.showMessage(
          'Registro exitoso',
          'Tu cuenta ha sido creada correctamente',
          'success'
        );

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        let message = 'Ocurrió un error. Inténtalo de nuevo.';
        if (err.error?.message) {
          message = err.error.message;
        }
        this.popupService.showMessage('Error', message, 'error');
      }
    });
  }
}
