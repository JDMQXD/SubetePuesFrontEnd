import { rol } from "./rol";
import { tipoDocumento } from "./tipoDocumento";

export class usuario{
    idUsuario: string = '';
    nombre: string = '';
    tipoDocumento: tipoDocumento = new tipoDocumento;
    rol: rol = new rol;
    documento: string = '';
    telefono: number = 0;
    correo: string = '';
    direccion: string = '';
    password: string  = '';

}