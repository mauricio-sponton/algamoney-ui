import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as moment from 'moment'; 
import { Lancamento } from '../core/model';

export class LancamentoFiltro{
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina: number = 0;
  itensPorPagina:number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any>{
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio){
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if(filtro.dataVencimentoFim){
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }


    return this.http.get(`${this.lancamentosUrl}?resumo`, { params }).toPromise().then((response: any) => {
      const lancamentos = response.content;
      const resultado = {
        lancamentos: lancamentos,
        total: response.totalElements
      };
      return resultado;
    });
  }

  excluir(codigo: number): Promise<void>{
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`).toPromise().then();
  }

  salvar(lancamento: Lancamento): Promise<Lancamento>{
    return this.http.post<Lancamento>(`${this.lancamentosUrl}`, lancamento).toPromise().then();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento>{
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento).toPromise().then();
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento>{
    return this.http.get(`${this.lancamentosUrl}/${codigo}`).toPromise().then((response:any) => {
      this.converterStringsParaDatas([response]);
      return response;
    });
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  uploadHeaders() {
    return new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }


  private converterStringsParaDatas(lancamentos: any[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = new Date(lancamento.dataVencimento);
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(lancamento.dataPagamento); 
      } 
    }
  }
}
