import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private a :AuthenticationService) {
  }
  ngOnInit(): void {
    console.log('Componente inicializado');
    // this.startInterval();
  }

  startInterval(): void {
    setInterval(() => {
      this.executeTask();
    }, 100 * 60 * 1000); // 10 minutos em milissegundos
  }

  executeTask(): void {
    console.log('Executando tarefa a cada 3 minutos');
    this.a.refresh()
    // Adicione aqui o código que deseja executar
  }
}
