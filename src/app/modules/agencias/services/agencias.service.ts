import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment.development';
import { Agencias } from 'src/app/core/model/agencias';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AgenciasService extends HttpService<Agencias> {

  @Output() triggerForm: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable: EventEmitter<any> = new EventEmitter();
  agenciasService: any;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.url_api}/`);
  }

  public createAgencia(nuevaAgencia: Agencias): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${environment.url_api}/agencia/registro`; // URL del endpoint de creación de agencia
    return this.http.post(url, nuevaAgencia, {headers});
  }



  public selectAgencia(agencia: Agencias) {
    this.agenciasService.triggerTable.emit(agencia);
  }

  public updateAgencia(agencia: Agencias): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${environment.url_api}/agencia/actualizacion`; // URL del endpoint de actualización de agencia
    return this.http.post(url, agencia, {headers});
  }

  public getTipoTickets(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${environment.url_api}/tipoTicket`; // URL del endpoint de tipos de ticket
    return this.http.get(url, {headers});
  }

}
