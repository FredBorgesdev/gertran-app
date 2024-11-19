import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-fixed-buttons',
  templateUrl: './fixed-buttons.component.html',
  styleUrls: ['./fixed-buttons.component.css']
})


export class FixedButtonsComponent implements OnInit {

  btn1 = false
  btn2 = false
  btn3 = false
  btn4 = false

  constructor(    
    public authService: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.btn1 = this.authService.user.permissions.filter(x => x.includes('reports.view_dashboard_tc1')).length > 0 || this.authService.user.isGertranStaff
    this.btn2 = this.authService.user.permissions.filter(x => x.includes('reports.view_dashboard_tc2')).length > 0 || this.authService.user.isGertranStaff
    this.btn3 = this.authService.user.permissions.filter(x => x.includes('reports.view_dashboard_tc3')).length > 0 || this.authService.user.isGertranStaff
    this.btn4 = this.authService.user.permissions.filter(x => x.includes('reports.view_dashboard_tc4')).length > 0 || this.authService.user.isGertranStaff
  }


  goToTowerControl1(): void {
    this.router.navigate(['reports', 'dashboards', 'tc1'], { queryParams: { fullscreen: 'true' } });
  }

  goToTowerControl2(): void {
    this.router.navigate(['reports', 'dashboards', 'tc2'], { queryParams: { fullscreen: 'true' } });
  }

  goToTowerControl3(): void {
    this.router.navigate(['reports', 'dashboards', 'tc3'], { queryParams: { fullscreen: 'true' } });
  }

  goToTowerControl4(): void {
    this.router.navigate(['reports', 'dashboards','tc4'], { queryParams: { fullscreen: 'true' } });
  }

  goBack(): void {
    this.router.navigate(['dashboard', 'home']);
  }

  toggleFullscreen(): void {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        // c/onsole.log(`Erro ao tentar entrar em tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}

