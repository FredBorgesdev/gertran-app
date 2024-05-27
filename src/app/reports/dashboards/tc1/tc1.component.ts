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

}