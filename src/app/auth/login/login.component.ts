import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUseCases } from '@core/application/auth/use-cases/auth-usecases';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {environment} from '@env/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    NgOptimizedImage
  ],
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup;
  protected fb = inject(FormBuilder);
  protected router = inject(Router);
  private loginUser=inject(AuthUseCases)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['user@luxuryevents.com', Validators.required],
      password: ['somepassword', Validators.required],
    });
  }

  onLogin() {

    const {email, password}=this.loginForm.value;
    this.loginUser.login(email,password).subscribe({
      next: ({token}) => {
        localStorage.setItem(environment.tokenKey, token);
        console.log('Inicio de sesión exitoso');
      },
      error: (error) => {
        console.error('Error en el inicio de sesión', error);
      },
    });
  }
}
