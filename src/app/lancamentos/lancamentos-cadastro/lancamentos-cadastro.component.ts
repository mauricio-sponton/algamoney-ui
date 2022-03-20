import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ]

  categorias = [];
  pessoas = [];

 // lancamento = new Lancamento();

  formulario!: FormGroup;
  uploadEmAndamento: boolean = false;

  constructor(
    private categoriaService: CategoriaService, 
    private erroHandlerService: ErrorHandlerService, 
    private pessoaService: PessoaService,
    private service: LancamentoService, 
    private messageService: MessageService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private title: Title,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.configurarFormulario();

    this.title.setTitle('Cadastrar Lançamento');
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento){
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  validarRequerido(input: FormControl){
    return (input.value ? null : {obrigatoriedade: true});
  }

  carregarLancamento(codigo: number){
    this.service.buscarPorCodigo(codigo).then(lancamento => {
     // this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);
      this.atualizarTitulo();
    }).catch(erro => this.erroHandlerService.handle(erro));
  }
  
  carregarCategorias(){
    return this.categoriaService.listarTodas().then(categorias => {
      this.categorias = categorias.map((c:any) => {
        return {label: c.nome, value: c.codigo};
      })
    }).catch(erro => this.erroHandlerService.handle(erro));
  }

  carregarPessoas(){
    return this.pessoaService.listarTodas().then(pessoas => {
      this.pessoas = pessoas.map((c:any) => {
        return {label: c.nome, value: c.codigo};
      })
    }).catch(erro => this.erroHandlerService.handle(erro));
  }

  salvar(){
    this.service.salvar(this.formulario?.value).then(lancamentoAdicionado =>{
      this.messageService.add({severity:'success', summary: 'Cadastrar Lançamento', detail: 'Lançamento cadastrado com sucesso!'});
    //  lancamentoForm.reset();
     // this.lancamento = new Lancamento();
     this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    }).catch(erro => this.erroHandlerService.handle(erro));
  }

  editar(){
    this.service.atualizar(this.formulario.value).then(lancamento => {
     // this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);
      this.atualizarTitulo();
      this.messageService.add({severity:'success', summary: 'Editar Lançamento', detail: 'Lançamento editado com sucesso!'});
    }).catch(erro => this.erroHandlerService.handle(erro));
  }

  decisaoForm(){
    if(this.editando){
      this.editar();
    }else{
      this.salvar();
    }
  }

  novo(){
   this.formulario.reset(new Lancamento());
    this.router.navigate(['/lancamentos/novo']);
  }

  get editando(){
    return Boolean(this.formulario.get('codigo')?.value);
  }

  aoTerminarUploadAnexo(event:any) {
    const anexo = event.originalEvent.body;
    console.log(anexo)
    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: (anexo.url as string).replace('\\', 'https://')
    });
    this.uploadEmAndamento = false;
  }

  erroUpload(event: any){
    this.messageService.add({severity:'error', summary: 'Upload de arquivo', detail: 'Erro ao tentar enviar arquivo anexo!'});
    this.uploadEmAndamento = false;
  }

  removerAnexo(){
    this.formulario.patchValue({
      anexo: null, 
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome = this.formulario?.get('anexo')?.value;
    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  antesUploadAnexo() {
    this.uploadEmAndamento = true;
  }

  get urlUploadAnexo() {
    return this.service.urlUploadAnexo();
  }

  get uploadHeaders() {
    return this.service.uploadHeaders();
  }

  atualizarTitulo(){
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')?.value}`);
  }
}
