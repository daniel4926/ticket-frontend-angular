import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from 'src/app/prime.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { AgenciasRoutingModule } from './agencias-routing.module';
import { Table, TableModule } from 'primeng/table';
import { ModalFormsComponent } from './components/modal-forms/modal-forms.component';
import { TableComponent } from './components/table/table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FilterInformationComponent } from 'src/app/shared/components/filter-information/filter-information.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [
      ModalFormsComponent,
      TableComponent,
      ToolbarComponent
    ],
    exports: [
      ModalFormsComponent,
      TableComponent,
      ToolbarComponent
    ],
    imports: [
        CommonModule,
        AgenciasRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
        TableModule,
        FilterInformationComponent,
        InputTextModule
    ]
})
export class AgenciasModule { }
