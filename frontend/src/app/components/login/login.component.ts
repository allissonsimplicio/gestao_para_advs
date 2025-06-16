import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  enteredEmail: string = '';
  enteredPassword: string = '';
  otpFormStatus = false;
  errors: { [key: string]: string } = {};

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  async onLoginHandler() {
    if (!this.enteredEmail || !this.enteredPassword) {
      this.toastr.error(
        'Email and Password are required',
        'Invalid credentials',
        {
          positionClass: 'toast-bottom-right',
        }
      );
      return;
    }
    this.loginService
      .verifyCredentials(this.enteredEmail, this.enteredPassword)
      .then((response) => {
        if (response === 'welcome') {
          this.toastr.success(
            'Login successful!',
            'Welcome',
            {
              positionClass: 'toast-bottom-right',
            }
          );
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error('Invalid credentials', 'Login failed', {
            positionClass: 'toast-bottom-right',
          });
        }
      });
  }

  closeOtpForm() {
    this.otpFormStatus = false;
    this.errors = {};
  }
}
