import { Injectable } from '@angular/core';
import { InitiateRequestService } from '../../shared/services/initiate-request.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private httpClient: InitiateRequestService,
    private spinner: NgxSpinnerService
  ) {}

  async registerUser(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    const api = 'http://localhost:12000/api/register';

    const token = await fetch('http://localhost:12000/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include',
    });

    this.spinner.show();
    return await fetch(api, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-Token': this.httpClient.getXsrfToken!,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          this.spinner.hide();
          return data;
        } else {
          this.spinner.hide();
          return data;
        }
      });
  }
}
