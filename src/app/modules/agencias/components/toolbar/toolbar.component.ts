import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalFormsComponent } from '../modal-forms/modal-forms.component';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { TableComponent } from '../table/table.component';
import { AgenciasService } from '../../services/agencias.service';
import { buttons } from 'src/app/core/constants/labels';
import { MenuItem, MessageService } from 'primeng/api';
import { Agencias } from 'src/app/core/model/agencias';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { messages } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [MessageService, HelpersService],
})
export class ToolbarComponent implements OnInit{
  public items: MenuItem[] = [];
  public cardMenu: MenuItem[] = [];
  public agenciaSelectedTable: any;
  public agenciaDialog: boolean = false;
  public agenciaDialogDelete: boolean = false;
  public agenciaDialogInfo: boolean = false;
  public submitted: boolean = false;
  public agencia = new Agencias();
  public data: object = {};
  public date: Date | undefined;
  public buttons = buttons;
  public selectedAgencia: Agencias;

  private modalFormsComponent!: ModalFormsComponent;
  private modalInfoComponent!: ModalInfoComponent;
  private modalDeleteComponent!: ModalDeleteComponent;
  private tableComponent!: TableComponent;
  public messages = messages;



  @ViewChild(ModalFormsComponent) modalForms: ModalFormsComponent;

  constructor(
    private agenciasService: AgenciasService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.agenciasService.triggerForm.subscribe((modalFormsComponent) => {
      this.modalForms = modalFormsComponent;
    });

    this.agenciasService.triggerInfo.subscribe((modalInfoComponent) => {
      this.modalInfoComponent = modalInfoComponent;
    });

    this.agenciasService.triggerDelete.subscribe((modalDeleteComponent) => {
      this.modalDeleteComponent = modalDeleteComponent;
    });

    this.agenciasService.triggerTable.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });

    this.agenciasService.triggerTable.subscribe((selectedAgencia) => { //Obtiene la informacion de la agencia seleccionada y lo usa en edit()
      this.selectedAgencia = selectedAgencia;
    });
  }

  public info() {
    this.modalInfoComponent.openInfo();
  }

  public deleteSelectedProducts() {
    this.modalDeleteComponent.openConfirm();
  }

  public create() {
      this.modalForms.openCreate();

      console.log ( "error", this.modalForms)

  }

  public edit() {
    console.log('Editando', this.selectedAgencia);
    if(this.selectedAgencia){
      this.modalForms.openEdit(this.selectedAgencia);
    }else{
      console.log('sin agencia');
      this.helpersService.messageNotification('info', messages.requiredSelection);
    }

  }
}
