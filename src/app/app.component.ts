import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { userDetails } from './utlity/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  personalNumb:string = '';
  submitted:boolean = false;
  registerForm:FormGroup;
  showMessage:boolean=false;
  constructor(private formBuilder: FormBuilder){
    this.registerForm = this.formBuilder.group({
      phoneNumber: ['', [ Validators.required,
       Validators.pattern("^[0-9]*$"),
       Validators.minLength(9), Validators.maxLength(10)]],
       name:['', [Validators.required, Validators.minLength(2), Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}")]],
       email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
       personalNumber:['',[ Validators.required,this.personalNumberValidator]]
   });
  }
  get f() { return this.registerForm.controls; }
  onSubmit():void {
    console.log(this.registerForm.value)
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
   }
  this.showMessage = true;
  }
  changePersonalNumber(){
   let formValue = {...this.registerForm};
   this.personalNumb = JSON.parse(JSON.stringify(formValue.value['personalNumber']));
  }
  personalNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const year =  control.value && control.value.substring(0,4);
    const month =  control.value && control.value.substring(4,6);
    const day =  control.value && control.value.substring(6,8);
    let dateString = `${year}-${month}-${day}`
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    let d = new Date(dateString);
    let dNum = d.getTime();  
    if (control.value && control.value.length != 12 || !dateString.match(regEx) || (!dNum && dNum !== 0) || (d.toISOString().slice(0,10) !== dateString)) {
      return { 'ssnerror': true };
    }
    return null;
  }
}
