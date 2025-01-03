import { Component, inject, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { 
 FormBuilder, 
 FormGroup, 
 FormsModule, 
 ReactiveFormsModule, 
 Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: 
  [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    CommonModule,
    FormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent implements OnInit {

  signInForm!: FormGroup;
  signUpForm!: FormGroup;

  durationInSeconds = 2;

  isSignUpClicked: boolean = false;
  isFormHidden: boolean = false;
  hide = true;
  hideRepeatPassword = true;

  private _snackBar = inject(MatSnackBar);

  constructor(private formBuilder: FormBuilder) 
  {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  checkPasswords() {
    const password = this.signUpForm.get('password')?.value;
    const repeatPassword = this.signUpForm.get('repeatPassword')?.value;
    if (password !== repeatPassword) {
      this.signUpForm.get('repeatPassword')?.setErrors({ passwordMismatch: true });
      this.signUpForm.get('repeatPassword')?.markAsTouched(); 
    } else {
      this.signUpForm.get('repeatPassword')?.updateValueAndValidity();
    }
  }
  
  
  onDontHaveAccount() {
    this.isFormHidden = true;
    this.isSignUpClicked = true;
    this.signInForm.reset();
  }

  onAlreadyHaveAccount() {
    this.isFormHidden = true;
    this.isSignUpClicked = false;
    this.signUpForm.reset();
  }

  onRegisterSubmit(email: string, password: string, repeatPassword: string, config?: MatSnackBarConfig) {
    console.log(email, password, repeatPassword);
    if(this.signUpForm.valid){
      const snackBarRef = this._snackBar.open("Successfully registered", "Okay");

      // After the snackbar message is clicked Okay, set isSignUpClicked to false to show the Signin Page, 
      // after succesfull Registeration
      snackBarRef.onAction().subscribe(() => {
        this.isSignUpClicked = false;
      });
    }
  }

  onLoginSubmit(email: string, password: string) {
    //code for routing to home page when login succesfully
  }

}
