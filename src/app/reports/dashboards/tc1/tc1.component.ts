import {Component} from '@angular/core';
import {AuthenticationService} from "../../../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './tc1.component.html',
  styleUrls: ['./tc1.component.css']
})
export class ControlTower1 {
  constructor(
    public authService: AuthenticationService,
    private router: Router,
  ) {
    const intervalId = setInterval(() => {
      const mapContainer = document.getElementById('mapContainer');
      if (mapContainer) {
        clearInterval(intervalId);
        this.fitMap(mapContainer)
        window.addEventListener("resize", ()=>{
          this.fitMap(mapContainer)
        });
      }
    }, 100); 
  }

  goTo(link: string, qp?: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([link], {queryParams: qp})
    );
    window.open(url, '_blank');
  }

  fitMap(element) {
    const sizeMapInnerHeight = window.innerHeight - 124;
    try {
      element.style.height =
        sizeMapInnerHeight + "px";
    } catch (error) {
      console.log('mapa não carregado')
    }
  }
}