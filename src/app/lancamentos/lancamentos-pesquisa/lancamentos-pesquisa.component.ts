import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid: any;

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(private service: LancamentoService, private messageService: MessageService, private confirmationService: ConfirmationService, private errorHandlerService: ErrorHandlerService, private title: Title, private authService: AuthService) { }

  ngOnInit(): void {
   this.title.setTitle('Pesquisar Lançamentos');
  }

  temPermissao(permissao: string){
    return this.authService.temPermissao(permissao);
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro).then(resposta => {
      this.totalRegistros = resposta.total;
      this.lancamentos = resposta.lancamentos;

    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent){
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows
    }
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any){
    
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o lançamento?',
      accept: () => {
        this.excluir(lancamento);
      }
  });
  }

  excluir(lancamento: any) {
    this.service.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({severity:'success', summary: 'Deletar registro', detail: 'Lançamento deletado com sucesso!'});
      }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
