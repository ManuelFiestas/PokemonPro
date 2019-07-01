import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  mostrar: number = 10;

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
    const desde = this.desde + valor;
    console.log(desde);

    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }


  async alertCrearUsuario() {

    const {value: formValues} = await Swal.fire({
      title: 'Registro de Usuario',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre de Usuario">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Contraseña">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ];
      }
    });

    if (formValues) {

      if (formValues[0] === '' || formValues[1] === '') {
        console.log('Campos vacíos');
        Swal.fire({
          type: 'error',
          title: 'Upsss...',
          text: 'Los campos son obligatorios'
        });
        return;
      }

      this._usuarioService.crearUsuario(formValues[0], formValues[1])
      .subscribe( resp => {
                    console.log(resp);
                    this.cargarUsuarios();
                });
    }

  }

}
