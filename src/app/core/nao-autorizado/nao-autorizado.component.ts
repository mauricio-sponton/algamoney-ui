import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <h1>
      Acesso Negado!
    </h1>
  `,
  styles: [
  ]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
