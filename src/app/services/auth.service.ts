import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    //use token if it is present in localstorage i.e. if token is not expire
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.userUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          const token = response.token;
          // Store the token in localStorage or a service for future use till expiry
          localStorage.setItem(this.authSecretKey, token);
          this.isAuthenticated = true;
        }
      })
    );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    this.toastr.info('Logout Successfully')
  }
}