import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { Agencias } from 'src/app/core/model/agencias';
import { AgenciasService } from '../../services/agencias.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { MessageService } from 'primeng/api';
import { TableComponent } from '../table/table.component';
import { messages } from 'src/app/core/constants/messages';
import { labels, titles, buttons } from 'src/app/core/constants/labels';

@Component({
  selector: 'app-modal-forms',
  templateUrl: './modal-forms.component.html',
  styleUrls: ['./modal-forms.component.scss'],
  providers: [MessageService, HelpersService],
})
export class ModalFormsComponent {
  public formAgencia: FormGroup = new FormGroup({});

  public displayModal: boolean;
  public agenciaForm: FormGroup;

  public submitted: boolean = false;
  public dialog: boolean = false;
  public titleForm: string = '';
  public labels = labels;
  public buttons = buttons;
  public messages = messages;
  public formOrder: FormGroup;

  private agencia!: Agencias;
  private agenciaResponse: any;
  private tableComponent!: TableComponent;

  public tipoTickets: any[] = [];

  public selectedTipoTickets: number[] = [];

  private selectedAgenciaId: number | null = null;

  @Input() selectedAgencia: Agencias | undefined;

  constructor(
    private agenciasService: AgenciasService,
    private helpersService: HelpersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.agenciasService.getObjectSelectedChange().subscribe((response) => {
      console.log('Response', response);
      this.agenciaResponse = response;
    });
    this.agenciasService.triggerForm.emit(this);
    this.agenciasService.triggerTable.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
    this.agenciasService.getTipoTickets().subscribe((tipoTickets) => {
      this.tipoTickets = tipoTickets.data;
      this.formAgencia = this.createFormGroup();
    });
  }

  public save() {
    this.submitted = true;
    if (this.formAgencia.valid) {
      if (this.agencia.id) {
        console.log('actualizando agencia')
        this.submitUpdate(this.agencia.id);
      } else {
        console.log('creando agencia ');
        this.submitCreate();
      }
    }
  }

  public openDialog(state: any, stateSubmitted?: any) {
    this.dialog = state;
    this.submitted = stateSubmitted;
  }

  public openCreate() {
    this.reset();
    this.submitted = false;
    this.titleForm = titles.create;
    this.openDialog(true);
  }

  public openEdit(agencia: Agencias) {
    this.agencia = agencia;
    this.titleForm = titles.edit;
    if (this.agencia && this.agencia.id) {
      this.updateFormValues(this.agencia);
      this.openDialog(true);
    } else {
      this.helpersService.messageNotification(
        'info',
        messages.requiredSelection
      );
    }
  }

  private createFormGroup() {
    return this.formBuilder.group({
      // Devuelve un FormGroup
      id: [''],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      tipoTicket: this.createTipoTicketsFormArray(),
    });
  }

  private createTipoTicketsFormArray() {
    const arr = this.tipoTickets.map((tipoTicket) => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }

  private submitCreate() {
    const selectedTipoTickets = this.formAgencia.value.tipoTicket
      .map((selected: { id: number }, i: number) =>
        selected ? this.tipoTickets[i].id : null
      )
      .filter((id: any) => id !== null);
    const data: Agencias = {
      ...this.formAgencia.value,
      tipoTicket: this.formAgencia.value.tipoTicket.filter(
        (id: any) => id !== null
      ),
    };

    const nuevaAgencia: Agencias = {
      id: null,
      codigo: this.formAgencia.value.codigo,
      descripcion: this.formAgencia.value.descripcion,
      direccion: this.formAgencia.value.direccion,
      tipoTicket: selectedTipoTickets,
    };

    this.agenciasService.createAgencia(nuevaAgencia).subscribe(
      (response) => {
        // Manejar la respuesta del servidor
        this.openDialog(false);
        this.helpersService.messageNotification(
          'success',
          messages.successCreate
        );
        this.tableComponent.reload();
        this.reset();
      },
      (error) => {
        this.helpersService.messageNotification('error', error.message);
      }
    );
  }

  private submitUpdate(idAgencia: number): void {
    const selectedTipoTickets = this.formAgencia.value.tipoTicket
      .map((selected: { id: number }, i: number) =>
        selected ? this.tipoTickets[i].id : null
      )
      .filter((id: any) => id !== null);
    const data: Agencias = {
      ...this.formAgencia.value,
      tipoTicket: this.formAgencia.value.tipoTicket.filter(
        (id: any) => id !== null
      ),
    };


    console.log('Agencia seleccionada ', idAgencia )
    if (idAgencia !== null) {
      const nuevaAgencia: Agencias = {
        id: idAgencia,
        codigo: this.formAgencia.value.codigo,
        descripcion: this.formAgencia.value.descripcion,
        direccion: this.formAgencia.value.direccion,
        tipoTicket: selectedTipoTickets,
      };

      this.agenciasService.updateAgencia(nuevaAgencia).subscribe(
        (response) => {
          // Manejar la respuesta del servidor
          this.openDialog(false);
          this.helpersService.messageNotification(
            'success',
            messages.successCreate
          );
          this.tableComponent.reload();
          this.reset();
        },
        (error) => {
          this.helpersService.messageNotification('error', error.message);
        }
      );
    }
  }


  private reset(): void {
    this.formAgencia.reset();
    this.agencia = new Agencias();
  }

  private updateFormValues(category: Agencias) {
    this.formAgencia.patchValue(category);
  }

  onTipoTicketChange(index: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const tipoTicketId = this.tipoTickets[index].id;
    if (isChecked) {
      // Agregar el ID a la lista de tipo de tickets seleccionados
      this.selectedTipoTickets.push(tipoTicketId);
    } else {
      // Quitar el ID de la lista de tipo de tickets seleccionados
      const selectedIndex = this.selectedTipoTickets.indexOf(tipoTicketId);
      if (selectedIndex !== -1) {
        this.selectedTipoTickets.splice(selectedIndex, 1);
      }
    }
  }

  public onSelectTipoTicket(id: number, isChecked: boolean) {
    if (isChecked) {
      // Agregar el ID a la lista de tipo de tickets seleccionados
      this.selectedTipoTickets.push(id);
    } else {
      // Quitar el ID de la lista de tipo de tickets seleccionados
      const index = this.selectedTipoTickets.indexOf(id);
      if (index !== -1) {
        this.selectedTipoTickets.splice(index, 1);
      }
    }
  }
}
