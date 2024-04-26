export class Agencias  {
  id: number=null;
  codigo: string = '';
  descripcion: string = '';
  direccion: string = '';
  tipoTicket: number[] = [];
}

export type AgenciaResponse = {
  data: Agencias[];
}
