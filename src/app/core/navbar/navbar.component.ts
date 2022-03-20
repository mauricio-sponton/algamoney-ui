import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibirMenu = false;
  nomeUsuario: any;

  constructor(private authService: AuthService, private logoutService: LogoutService, private errorHandlerService: ErrorHandlerService, private router: Router) {
    this.nomeUsuario = authService.jwtPayload?.nome;
   }

  ngOnInit(): void {
  }

  temPermissao(permissao: string) {
    return this.authService.temPermissao(permissao);
  }

  logout(){
    this.logoutService.logout().then(() =>{
      this.router.navigate(['/login']);
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

 
}
