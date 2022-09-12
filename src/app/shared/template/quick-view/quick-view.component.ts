import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html'
})

export class QuickViewComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }
}

