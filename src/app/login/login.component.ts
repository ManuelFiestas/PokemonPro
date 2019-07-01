import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import * as CryptoJS from 'crypto-js';
import { CRYPTJS_PRIVATKEY } from '../config/config';

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
    // Decrypt
    const bytes  = CryptoJS.AES.decrypt(localStorage.getItem('ciphertext'), CRYPTJS_PRIVATKEY);
    const plaintText = bytes.toString(CryptoJS.enc.Utf8);
    // End Decrypt
    this.password = plaintText || '';
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
                  .subscribe( correcto => this.router.navigate(['/dashboard']));

  }

}
