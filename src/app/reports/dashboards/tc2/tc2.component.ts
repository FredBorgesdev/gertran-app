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
}
