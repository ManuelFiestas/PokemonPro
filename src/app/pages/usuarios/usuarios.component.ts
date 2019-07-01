import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  mostrar: number = 5;

  totalRegistros: number = 0;
  cargando: boolean = true;



  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde, this.mostrar )
              .subscribe( (resp: any) => {
                this.totalRegistros = resp.length;
                this.usuarios = resp;
                this.cargando = false;
              });

  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    console.log(desde);

    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }


  alertCrearUsuario() {

  }

}
