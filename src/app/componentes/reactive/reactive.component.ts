import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  forma!: FormGroup;
  constructor(private fb: FormBuilder, private validadores : ValidadoresService) {
 //Crear formularios
 this.crearFormulario();
 //cardar data al form
 this.CargarDataAlFormulario();
 //crear listeners
 this.crearListeners();

   }
  crearListeners() {
    // this.forma.statusChanges.subscribe(data => {console.log(data);})
    // this.forma.valueChanges.subscribe(data => {console.log(data);})
    this.forma.get('nombre')?.valueChanges.subscribe(console.log);
  }

   
  ngOnInit(): void {
  }
  //propiedades de form
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
  get municipioNoValido(){
    return this.forma.get('municipio')?.invalid && this.forma.get('direccion.municipio')?.touched
  }
  get ciudadNoValido(){
    return this.forma.get('ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }
  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return (pass1 === pass2) ? false : true;
  }
  
  crearFormulario()
  {
    this.forma = this.fb.group({
      nombre : ['',[Validators.required, Validators.minLength(5)]],
      apellido : ['',[Validators.required, this.validadores.noEsAdmin]],
      correo : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$')]],
      usuario : ['',,this.validadores.existeUsuario],
      pass1 : ['', Validators.required],
      pass2 : ['', Validators.required],
      direccion : this.fb.group({
        municipio : ['', Validators.required],
        ciudad : ['', Validators.required],
      }),
      pasatiempos : this.fb.array([])
    }),{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    }
  }
  CargarDataAlFormulario()
  {
    this.forma.reset({
      nombre : 'Edvin',
      apellido : 'Pérez',
      correo : 'edvinpere237@gmail.com',
      usuario : 'EdSan21',
      pass1 : 'Guate2021',
      pass2 : 'Guate2021',
      direccion : {
        municipio : 'San José Pinula',
        ciudad : 'Guatemala'
      }
    });
  }
}
