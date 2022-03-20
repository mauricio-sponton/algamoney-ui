import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoService } from './lancamentos/lancamento.service';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'

import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { SegurancaModule } from './seguranca/seguranca/seguranca.module';
import { AuthService } from './seguranca/auth.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardService } from './dashboard/dashboard.service';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { RelatoriosService } from './relatorios/relatorios.service';

registerLocaleData(localePt);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    CoreModule,
    DashboardModule,
    RelatoriosModule,
    HttpClientModule,
    ToastModule, 
    ConfirmDialogModule,
    RouterModule,
    
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
      }),
      AppRoutingModule,
  ],
  providers: [LancamentoService, MessageService, ConfirmationService, TranslateService, DashboardService, RelatoriosService, AuthService, {provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
