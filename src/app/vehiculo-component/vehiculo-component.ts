import { Component } from '@angular/core';
import { Vehiculo } from '../clases/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculo-component',
  standalone: false,
  templateUrl: './vehiculo-component.html',
  styleUrl: './vehiculo-component.css',
})
export class VehiculoComponent{


  vehiculos: Vehiculo[] = [];
  vehiculosFiltrados: Vehiculo[] = [];
  
  filtroMarca: string = '';
  filtroModelo: string = '';
  filtroCiudad: string = '';
  filtroDepartamento: string = '';
  filtroCategoria: string = '';
  filtroTipo: string = '';
  
  ciudades: string[] = [];
  departamentos: string[] = [];
  categorias: string[] = [];
  tipos: string[] = [];
  marcas: string[] = [];
  
  loading: boolean = true;
  error: string = '';

  constructor(private vehiculoService: VehiculoService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.loading = true;
    this.vehiculoService.getAllVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.vehiculosFiltrados = data;
        this.extraerOpcionesFiltros();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
        this.error = 'Error al cargar los vehículos. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  extraerOpcionesFiltros(): void {
    this.ciudades = [...new Set(this.vehiculos
      .filter(v => v.ubicacion && v.ubicacion.nombre)
      .map(v => v.ubicacion.nombre))
    ].sort();

    this.departamentos = [...new Set(this.vehiculos
      .filter(v => v.ubicacion && v.ubicacion.departamento && v.ubicacion.departamento.nombre)
      .map(v => v.ubicacion.departamento.nombre))
    ].sort();

    this.categorias = [...new Set(this.vehiculos
      .filter(v => v.tipoVehiculo && v.tipoVehiculo.categoria && v.tipoVehiculo.categoria.nombre)
      .map(v => v.tipoVehiculo.categoria.nombre))
    ].sort();

    this.tipos = [...new Set(this.vehiculos
      .filter(v => v.tipoVehiculo && v.tipoVehiculo.nombre)
      .map(v => v.tipoVehiculo.nombre))
    ].sort();

    this.marcas = [...new Set(this.vehiculos
      .filter(v => v.marca)
      .map(v => v.marca))
    ].sort();
  }

  aplicarFiltros(): void {
  this.vehiculosFiltrados = this.vehiculos.filter(vehiculo => {
      const cumpleMarca = !this.filtroMarca || 
        (vehiculo.marca && vehiculo.marca.toLowerCase().includes(this.filtroMarca.toLowerCase()));
      
      const cumpleModelo = !this.filtroModelo || 
        (vehiculo.modelo && vehiculo.modelo.toLowerCase().includes(this.filtroModelo.toLowerCase()));
      
      const cumpleCiudad = !this.filtroCiudad || 
        (vehiculo.ubicacion && vehiculo.ubicacion.nombre === this.filtroCiudad);
      
      const cumpleDepartamento = !this.filtroDepartamento || 
        (vehiculo.ubicacion && vehiculo.ubicacion.departamento && 
         vehiculo.ubicacion.departamento.nombre === this.filtroDepartamento);
      
      const cumpleCategoria = !this.filtroCategoria || 
        (vehiculo.tipoVehiculo && vehiculo.tipoVehiculo.categoria && 
         vehiculo.tipoVehiculo.categoria.nombre === this.filtroCategoria);
      
      const cumpleTipo = !this.filtroTipo || 
        (vehiculo.tipoVehiculo && vehiculo.tipoVehiculo.nombre === this.filtroTipo);

      return cumpleMarca && cumpleModelo && cumpleCiudad && 
             cumpleDepartamento && cumpleCategoria && cumpleTipo;
    });
  }

  limpiarFiltros(): void {
    this.filtroMarca = '';
    this.filtroModelo = '';
    this.filtroCiudad = '';
    this.filtroDepartamento = '';
    this.filtroCategoria = '';
    this.filtroTipo = '';
    this.vehiculosFiltrados = this.vehiculos;
  }

  irAReservas() {
    const token = this.authService.getToken();
    const role = this.authService.getRole();

    if (token && role === 'ROLE_USER') {
      this.router.navigate(['/reservas']);
    } else {
      alert('Debes iniciar sesión con una cuenta de usuario.');
      this.router.navigate(['/login']);
    }
  }

}
