import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { ITokenResponse } from '../interface/ITokenResponse';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [ '', [Validators.required] ],
      password: [ '', [Validators.required, Validators.minLength(4)] ],
    });
  }

  public onSubmitLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    /*const formDataLogin = {
      username: this.loginForm.get("username").value.toUpperCase(),
      password: this.loginForm.get("password").value.toUpperCase()
    };*/
    const formDataLogin = this.loginForm.value;

    this.authService.validar_credenciales(formDataLogin).subscribe({
      next: (token: ITokenResponse) => {
        this.tokenService.setToken(token.data[0]);
        this.router.navigateByUrl('/app/pos');
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });

  }

}
