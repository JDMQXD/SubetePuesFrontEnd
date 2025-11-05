import { Ciudad } from "./ciudad";
import { Transmision } from "./transmision";
import { TipoVehiculo } from "./tipoVehiculo";
import { Disponibilidad } from "./disponibilidad";
import { usuario } from "./usuario";

export class Vehiculo {
    idVehiculo: string = '';
    transmision: Transmision = new Transmision();
    ubicacion: Ciudad = new Ciudad();
    usuario:usuario = new usuario;
    tipoVehiculo: TipoVehiculo = new TipoVehiculo();
    disponibilidad: Disponibilidad = new Disponibilidad();
    modelo: string = '';
    marca: string = '';
    especificacion: string = '';
    fechaRegistro: Date = new Date();
}