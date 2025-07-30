import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';







import Cookies from 'js-cookie';

export const GERTRAN_CUSTOMER_ID = 'GERTRAN_CUSTOMER_ID';
export const GERTRAN_WEB_TOKEN = 'GERTRAN_WEB_TOKEN';
const GERTRAN_REFRESH_TOKEN = 'GERTRAN_REFRESH_TOKEN';



@Component({
  selector: 'app-magic-login',
  template: `<div class="magic-login-container">
    <p *ngIf="status === 'loading'">Validando link de acesso...</p>
    <p *ngIf="status === 'success'" style="color: green;">{{ message }}</p>
    <p *ngIf="status === 'error'" style="color: red;">{{ message }}</p>
  </div>`,
  styles: [`
    .magic-login-container {
      text-align: center;
      margin-top: 50px;
      font-size: 18px;
    }
  `]
})

export class MagicLoginComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uid = this.route.snapshot.queryParamMap.get('uid');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (uid && token) {
      this.http.get<any>(`http://0.0.0.0:8033/v1/auth/magic-login/?uid=${uid}&token=${token}`).subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          this.status = 'success';
          this.message = 'Login realizado com sucesso. Redirecionando...';
          Cookies.set(GERTRAN_WEB_TOKEN, res.access);
          Cookies.set(GERTRAN_REFRESH_TOKEN, res.refresh);
          console.log(res)
          setTimeout(() => window.location.href = '/dashboard/home', 2000); // ajuste para a rota desejada
        },
        error: (err) => {
          this.status = 'error';
          this.message = 'Falha no login. Link inválido ou expirado.';
        }
      });
    } else {
      this.status = 'error';
      this.message = 'Parâmetros inválidos no link.';
    }
  }
}
