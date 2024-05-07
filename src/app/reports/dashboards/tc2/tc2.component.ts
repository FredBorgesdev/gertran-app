import {Component} from '@angular/core';
import {AuthenticationService} from "../../../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './tc2.component.html',
  styleUrls: ['./tc2.component.css']
})
export class ControlTower2 {

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

  goToTowerControl2(): void {
    this.router.navigate(['reports', 'dashboards','tc2'], { queryParams: { fullscreen: 'true' } });
  }

  goToTowerControl3(): void {
    this.router.navigate(['reports', 'dashboards','tc3'], { queryParams: { fullscreen: 'true' } });
  }

}
