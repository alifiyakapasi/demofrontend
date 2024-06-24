import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const credentials = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Token:', localStorage.getItem('token'));
        this.router.navigate(['/products']);
        this.toastr.success('Login Successfully')
      },
      (error) => {
        this.toastr.error('Enter valid UserName or Password')
      }
    );
  }
}