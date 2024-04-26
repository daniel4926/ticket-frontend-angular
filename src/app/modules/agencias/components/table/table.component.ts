import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgenciasService } from '../../services/agencias.service';
import { Agencias } from 'src/app/core/model/agencias';
import { Table } from 'primeng/table';
import { mainTitles } from 'src/app/core/constants/labels';
import { messages } from 'src/app/core/constants/messages';
import { labels, buttons, titles, tooltip } from 'src/app/core/constants/labels';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() agencias!: Agencias[];
  @Output() rowSelectedEmiiter = new EventEmitter();
  @ViewChild('filter') filter!: ElementRef;

  public titleAgencia: any = mainTitles['agencias'];
  public selectedAgencias: Agencias[] = [];
  public firstPage = 0;
  public labels = labels;
  public titles = titles;
  public buttons = buttons;
  public messages = messages;
  public tooltip = tooltip;

  constructor(
    private agenciasService: AgenciasService
  ) { }

  ngOnInit() {
    this.agenciasService.triggerTable.emit(this);
  }

  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  public reload() {
    const data = new Agencias();
    this.agenciasService.setObjectFilterChange(data);
    this.firstPage = 0;
  }

  public onRowSelect(event: any) {
    this.sendSelectedAgencia(event.data);
  }

  public onRowUnselect(event: any) {
    const data = new Agencias();
    this.sendSelectedAgencia(data);
  }

  private sendSelectedAgencia(selectedAgencia: Agencias) {
    this.agenciasService.setObjectSelectedChange(selectedAgencia);
  }
}
