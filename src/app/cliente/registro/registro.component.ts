import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CredentialsService } from '../../services/auth/credentials.service';

@Component({
  selector: 'app-registro',
  imports: [RouterLink,ReactiveFormsModule],
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  registroForm:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private credentialService: CredentialsService
  ){}

}
