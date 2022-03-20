import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas.routing.module';
import { PanelModule } from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent,
    PessoaCadastroContatoComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    TooltipModule,
    CalendarModule,
    InputMaskModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule, 
    PessoasRoutingModule,
    PanelModule,
    DialogModule,
    DropdownModule
  ],
  exports: []
})
export class PessoasModule { }
