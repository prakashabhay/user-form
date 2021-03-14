import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ssnNumber: string;
  maskedSection: any;
  visibleSection: any;
  submitted:boolean = false;
  maskedSectionOriginal: string = "";
  userDetails: any = {};
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
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
   }
  this.showMessage = true;
  }
  personalNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const year =  control.value && control.value.substring(0,4);
    const month =  control.value && control.value.substring(4,6);
    const day =  control.value && control.value.substring(6,8);
    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    const isValidDate = dateRegex.test(year+'-'+month+'-'+day)
    
    if (control.value && control.value.length != 12 || !isValidDate) {
      return { 'ssnerror': true };
    }
    return null;
  }
personalNumberInput(event):void {
      let temp=JSON.parse(JSON.stringify(this.userDetails.personalNumber));
      temp=  temp.replace(/\*/g, '');
      if(!isNaN(temp))
        this.maskPersonalNumber(this.userDetails.personalNumber)
        else
        this.clearData();
    
}
maskPersonalNumber(event):void {
    if (event.length > 8) {
        let visibleDigitstemp = 8 - event.length;
        let maskedSectiontemp = event.slice(visibleDigitstemp);
        if (maskedSectiontemp){
          maskedSectiontemp = maskedSectiontemp.replace(/\*/g, '');
        }
      
        if (maskedSectiontemp.length > 0) {
            this.maskedSectionOriginal = this.maskedSectionOriginal + JSON.parse(JSON.stringify(maskedSectiontemp));
        }
    }
    this.maskedSection = event.slice(8);
    this.visibleSection = event.slice(0,8);
    this.userDetails.personalNumber =  this.visibleSection+this.maskedSection.replace(/./g, '*');

    this.ssnNumber =  this.visibleSection+this.maskedSectionOriginal;
}
clearData():void {
    this.maskedSection = "";
    this.visibleSection = "";
    this.userDetails.personalNumber = "";
    this.ssnNumber = "";
    this.maskedSectionOriginal="";
}
}
