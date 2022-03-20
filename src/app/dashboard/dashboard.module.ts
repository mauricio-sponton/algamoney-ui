import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'primeng/api';

import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    PanelModule,
    ChartModule
  ],
  providers: [DecimalPipe]
})
export class DashboardModule { }
