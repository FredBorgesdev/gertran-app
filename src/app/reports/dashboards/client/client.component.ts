import {Component} from '@angular/core';
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  constructor(
    public authService: AuthenticationService,
  ) {
  }
}
