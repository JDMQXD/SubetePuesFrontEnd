import { servicio } from "./servicio";
import { usuario } from "./usuario";
import { Vehiculo } from "./vehiculo";

export class reserva{
    idReserva: string = '';
    servicio: servicio = new servicio;
    Vehiculo: Vehiculo = new Vehiculo;
    usuario: usuario = new usuario;
    fechaReserva: Date = new Date();
    fechaInicio: Date = new Date();
    fechaFin: Date = new Date();
    lugarEntrega: string = '';
    
}