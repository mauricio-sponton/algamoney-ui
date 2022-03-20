import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid: any;
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(private service: PessoaService, private confirmationService: ConfirmationService, private messageService: MessageService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
   
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro).then(resposta => {
      this.totalRegistros = resposta.total;
      this.pessoas = resposta.pessoas;

    });
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

  excluir(pessoa: any) {
    this.service.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({severity:'success', summary: 'Deletar registro', detail: 'Pessoa deletada com sucesso!'});
      }).catch(erro => this.errorHandlerService.handle(erro));
  }

  mudarStatus(pessoa: any): void{
    const novoStatus = !pessoa.ativo;

    this.service.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

}
