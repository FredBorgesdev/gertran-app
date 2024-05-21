import {Component} from '@angular/core';
import {AuthenticationService} from "../../../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './tc1.component.html',
  styleUrls: ['./tc1.component.css']
})
export class ControlTower1 {
  mapIsSelected = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
  ) {
  }

  goTo(link: string, qp?: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([link], {queryParams: qp})
    );
    window.open(url, '_blank');
  }

  goBack(): void {
    this.router.navigate(['dashboard', 'home']);
  }

  toggleFullscreen(): void {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.log(`Erro ao tentar entrar em tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  goToTowerControl1(): void {
    this.router.navigate(['reports', 'dashboards','tc1'], { queryParams: { fullscreen: 'true' } });
  }

  goToTowerControl3(): void {
    this.router.navigate(['reports', 'dashboards','tc3'], { queryParams: { fullscreen: 'true' } });
  }
  
  goToTowerControl4(): void {
    this.router.navigate(['reports', 'dashboards','tc4'], { queryParams: { fullscreen: 'true' } });
  }

}