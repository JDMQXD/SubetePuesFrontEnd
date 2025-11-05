import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { ReservasComponent } from './reservas-component/reservas-component';
import { PropietarioComponent } from './propietario-component/propietario-component';
import { RoleGuard } from './guards/role.guard';
import { VehiculoComponent } from './vehiculo-component/vehiculo-component';
import { DetalleVehiculoComponent } from './detalle-vehiculo-component/detalle-vehiculo-component';
import { AdministradorComponent } from './administrador-component/administrador-component';


const routes: Routes = [
  { path: '', redirectTo: '/vehiculos', pathMatch: 'full' },
  {path: 'vehiculos', component: VehiculoComponent},
  { path: 'login', component: LoginComponent },
  { path: 'reservas/:idVehiculo', component: ReservasComponent, canActivate: [RoleGuard], data: { role: 'ROLE_USER' } },
  { path: 'propietarios', component: PropietarioComponent, canActivate: [RoleGuard], data: { role: 'ROLE_PROPIETARIO' } },
  { path: 'detalles/:id', component: DetalleVehiculoComponent, canActivate: [RoleGuard], data: { role: 'ROLE_USER' }},
  { path: 'administrador', component: AdministradorComponent, canActivate:[RoleGuard], data: { role: 'ROLE_ADMIN'}},

  { path: '**', redirectTo: '/vehiculos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
