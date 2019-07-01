import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;
  recuerdame: boolean = false;

  constructor( public router: Router,
               public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.name = localStorage.getItem('username') || '';
    if ( this.name.length > 1 ) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(null, forma.value.name, forma.value.password, null);

    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe(
                    correcto => {
                      const toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      toast.fire({
                        type: 'success',
                        title: 'Login Correcto :)'
                      });
                      this.router.navigate(['/dashboard']);
                  },
                    err => {
                      console.log('Error Capturado', err.error.response);
                      Swal.fire({
                        type: 'error',
                        title: 'Upsss...',
                        text: err.error.response
                      });
                    }

                    );

  }

}
