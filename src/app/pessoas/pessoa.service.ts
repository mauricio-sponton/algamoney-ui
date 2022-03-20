import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade, Estado, Pessoa } from '../core/model';

export class PessoaFiltro{
  nome?: string;
  pagina: number = 0;
  itensPorPagina:number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.cidadesUrl = 'http://localhost:8080/cidades';
    this.estadosUrl = 'http://localhost:8080/estados';
   }

  pesquisar(filtro: PessoaFiltro): Promise<any>{
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params }).toPromise().then((response: any) => {
      const pessoas = response.content;
      const resultado = {
        pessoas: pessoas,
        total: response.totalElements
      };
      return resultado;
    });
  }

  listarTodas(): Promise<any>{
    return this.http.get(`${this.pessoasUrl}`).toPromise().then((resposta:any) => resposta.content);
  }

  excluir(codigo: number): Promise<void>{
    return this.http.delete(`${this.pessoasUrl}/${codigo}`).toPromise().then();
  }

  mudarStatus(codigo:number, ativo: boolean): Promise<void>{
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo).toPromise().then();
  }

  salvar(pessoa: Pessoa): Promise<Pessoa>{
    return this.http.post(`${this.pessoasUrl}`, pessoa).toPromise().then();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa>{
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa).toPromise().then();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa>{
    return this.http.get(`${this.pessoasUrl}/${codigo}`).toPromise().then();
  }

  listarEstados(): Promise<Estado[]>{
    return this.http.get(`${this.estadosUrl}`).toPromise().then();
  }

  pesquisarCidades(estadoId: number): Promise<Cidade[]> {
    const params = new HttpParams()
      .set('estado', estadoId);

    return this.http.get<Cidade[]>(this.cidadesUrl, { params }).toPromise().then();
  }

}
