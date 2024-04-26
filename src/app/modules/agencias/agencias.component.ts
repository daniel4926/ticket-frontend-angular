import { Component, OnInit } from '@angular/core';
import { labels, mainTitles } from 'src/app/core/constants/labels';
import { Agencias } from 'src/app/core/model/agencias';
import { AgenciasService } from './services/agencias.service';
import { AgenciasModule } from './agencias.module';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.css'],
  standalone: true,
  imports: [
    AgenciasModule,
    ModalInfoComponent,
    ModalDeleteComponent,
    TableModule,
  ],
})
export default class AgenciasComponent implements OnInit {
  public agencias!: Agencias[];
  public agencia!: Agencias;
  public labels = labels;
  public columns: string[] = ['id', 'codigo', 'descripcion', 'direccion'];
  constructor(public agenciasService: AgenciasService) {}

  ngOnInit(): void {
    this.createGrid();
    this.agenciasService.getObjectFilterChange().subscribe(() => {
      this.createGrid();
    });
  }

  public createGrid(): void {
    this.agenciasService.findAll().subscribe({
      next: (response) => (this.agencias = response.data),
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  public selectAgencia(agencia: Agencias) {
    this.agenciasService.triggerTable.emit(agencia);
  }

}
