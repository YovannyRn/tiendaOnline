import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {CredentialsService} from '../../services/auth/credentials.service';
import {LoginInterface} from '../../services/interfaces/auth';
import { TokenService } from '../../services/auth/token.service';
import { UseSatateService } from '../../services/auth/use-satate.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private tokenService: TokenService,
    private router: Router,
    private userStateService: UseSatateService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

   submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.credentialsService.login(this.loginForm.value as LoginInterface).subscribe({
      next: (data) => {
        this.tokenService.saveToken(data.token,"3453525235");
        this.userStateService.save(data.username, data.role);
        this.router.navigate(['/app/control-panel']);
        console.log(data);
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
