import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-form-class',
  templateUrl: './form-class.component.html',
  styleUrls: ['./form-class.component.css']
})
export class FormClassComponent implements OnInit {
  forma! : FormGroup;

  constructor(private fb: FormBuilder, private validadores : ValidadoresService) { 
    //Crear Forms
    this.crearFormularios();
    //Carga Data al Form
    this.CargarDataAlForm();
    //Crear Listeners
    this.crearListeners();
  }
  crearFormularios() {
    this.forma = this.fb.group({
      nombre : ['',[Validators.required, Validators.minLength(5)]],
      apellido : ['',[Validators.required, this.validadores.noEsAdmin]],
      correo : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$')]],
      usuario : ['',,this.validadores.existeUsuario],
      pass1 : ['', Validators.required],
      pass2 : ['', Validators.required],
      direccion : ['', Validators.required],
      pasaTiempos : this.fb.array([])
    }),
    {
      validators : this.validadores.passwordsIguales('pass1', 'pass2')
    }
  }
  CargarDataAlForm() {
    this.forma.reset({
      nombre : 'Luffy',
      apellido : 'Monkey',
      correo : 'goingmerry@onepiece.jp',
      usuario : 'luffy21',
      pass1 : 'Sunny_Go!',
      pass2 : 'Sunny_Go!',
      direccion : 'One Piece'
    });
  }
  crearListeners() {
    this.forma.get('nombre')?.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {
  }
  get pasaTiempos(){
    return this.forma.get('pasaTiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }

  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }

  get usuarioNoValido(){
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
  }

  get direccionNoValido(){
    return this.forma.get('direccion')?.invalid && this.forma.get('direccion')?.touched
  }

  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;
    return (pass1 === pass2) ? false : true;
  }

}
