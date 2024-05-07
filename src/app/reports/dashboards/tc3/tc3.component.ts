import {Component} from '@angular/core';
import {AuthenticationService} from "../../../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './tc3.component.html',
  styleUrls: ['./tc3.component.css']
})
export class ControlTower3 {

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
    window.history.back();
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

  exitFullscreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  goToTowerControl1(): void {
    this.router.navigate(['reports', 'dashboards','tc1'], { queryParams: { fullscreen: 'true' } });
  }

  goToTowerControl2(): void {
    this.router.navigate(['reports', 'dashboards','tc2'], { queryParams: { fullscreen: 'true' } });
  }
}