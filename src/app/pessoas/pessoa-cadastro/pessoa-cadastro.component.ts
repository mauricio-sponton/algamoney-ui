import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Contato, Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados!: any[];
  cidades!: any[];
  estadoSelecionado?: number;
  

  constructor(private service: PessoaService, private messageService: MessageService, private errorHandlerService: ErrorHandlerService, private route: ActivatedRoute, private router: Router, private title: Title, private erroHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Cadastrar Pessoa');

    if(codigoPessoa){
      this.carregarPessoa(codigoPessoa);
    }

    this.carregarEstados();

  }

  carregarPessoa(codigo: number){
    this.service.buscarPorCodigo(codigo).then(pessoa => {
      this.pessoa = pessoa;

      this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
        this.pessoa.endereco.cidade.estado.codigo : undefined;

      if(this.estadoSelecionado){
        this.carregarCidades();
      }

      console.log(this.pessoa.endereco.cep);
    }).catch(erro => this.erroHandlerService.handle(erro));
  }

  carregarEstados(){
    this.service.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({
        label: uf.nome,
        value: uf.codigo
      }));
    }).catch(erro => this.erroHandlerService.handle(erro));
  }

  carregarCidades() {
    this.service.pesquisarCidades(this.estadoSelecionado!)
      .then(cidades => {
          this.cidades= cidades.map(c => ({
              label: c.nome,
              value: c.codigo
          }));
          if (this.estadoSelecionado !== this.pessoa.endereco.cidade.estado.codigo)
              this.pessoa.endereco.cidade.codigo = undefined;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: NgForm){
    this.service.salvar(this.pessoa).then(pessoaAtualizada=>{
      this.messageService.add({severity:'success', summary: 'Cadastrar Pessoa', detail: 'Pessoa cadastrada com sucesso!'});
      //form.reset();
     // this.pessoa = new Pessoa();
     this.router.navigate(['/pessoas', pessoaAtualizada.codigo]);
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  editar(form:NgForm){
    this.service.atualizar(this.pessoa).then(pessoa =>{
      this.pessoa = pessoa;
      this.messageService.add({severity:'success', summary: 'Editar Pessoa', detail: 'Pessoa atualizada com sucesso!'});
      this.atualizarTitulo();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  decisaoForm(form: NgForm){
    if(this.editando){
      this.editar(form);
    }else{
      this.salvar(form);
    }
  }

  get editando(){
    return Boolean(this.pessoa.codigo);
  }

  atualizarTitulo(){
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  novo(form: NgForm){
    form.reset(new Pessoa());
    this.router.navigate(['/pessoas/novo']);
  }

  

}
