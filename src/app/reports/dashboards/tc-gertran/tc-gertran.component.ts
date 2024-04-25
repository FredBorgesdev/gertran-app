import {Component} from '@angular/core';
import {AuthenticationService} from "../../../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tc-gertran',
  templateUrl: './tc-gertran.component.html',
  styleUrls: ['./tc-gertran.component.css']
})
export class ControlTowerGertran {
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