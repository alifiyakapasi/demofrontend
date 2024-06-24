import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  constructor(private authService: AuthService, private router : Router) {}
  title = 'demofrontend';

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
