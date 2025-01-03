import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('SigninComponent', () => {

  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let debugElement: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, SigninComponent, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  // Ensure the sign-in and sign-up forms are initialized
  it('should initialize sign-in and sign-up forms', () => {
    expect(component.signInForm).toBeDefined();
    expect(component.signUpForm).toBeDefined();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display sign-in form by default', () => {
    expect(component.isSignUpClicked).toBeFalse();
    const signInForm = debugElement.query(By.css('form'));
    expect(signInForm).toBeTruthy();
  });

  it('should toggle to sign-up form when "Don\'t have an account? REGISTER" is clicked', () => {
    const registerButton = debugElement.query(By.css('[test-id="register-button"]'));
    registerButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.isSignUpClicked).toBeTrue();
    const signUpForm = debugElement.query(By.css('form'));
    expect(signUpForm).toBeTruthy();
  });

  it('should toggle back to sign-in form when "Already have an account? LOGIN" is clicked', () => {
    component.isSignUpClicked = true;
    fixture.detectChanges();
    const loginButton = debugElement.query(By.css('[test-id="login-button"]'));
    loginButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.isSignUpClicked).toBeFalse();
  });

  describe('Sign-in Form', () => {
    it('should disable login button if email is empty', () => {
      setEmail('');
      setPassword('password123');
      const loginButton = getLoginButton();
      expect(loginButton.disabled).toBeTrue();
    });

    it('should disable login button if password is empty', () => {
      setEmail('test@example.com');
      setPassword('');
      const loginButton = getLoginButton();
      expect(loginButton.disabled).toBeTrue();
    });

    it('should enable login button when both email and password are valid', () => {
      setEmail('test@example.com');
      setPassword('password123');
      const loginButton = getLoginButton();
      expect(loginButton.disabled).toBeFalse();
    });
  });

  describe('Sign-up Form', () => {
    beforeEach(() => {
      component.onDontHaveAccount();
      fixture.detectChanges();
    });

    it('should disable register button if email is empty', () => {
      setSignUpEmail('');
      setSignUpPassword('password123');
      setSignUpRepeatPassword('password123');
      const registerButton = getRegisterButton();
      expect(registerButton.disabled).toBeTrue();
    });

    it('should disable register button if password and repeat password is empty', () => {
      setSignUpEmail('test@email.com');
      setSignUpPassword('');
      setSignUpRepeatPassword('');
      const registerButton = getRegisterButton();
      expect(registerButton.disabled).toBeTrue();
    });

    it('should disable register button if password is empty', () => {
      setSignUpEmail('test@email.com');
      setSignUpPassword('');
      setSignUpRepeatPassword('password123');
      const registerButton = getRegisterButton();
      expect(registerButton.disabled).toBeTrue();
    });

    it('should disable register button if repeat password is empty', () => {
      setSignUpEmail('test@email.com');
      setSignUpPassword('password123');
      setSignUpRepeatPassword('');
      const registerButton = getRegisterButton();
      expect(registerButton.disabled).toBeTrue();
    });

    it('should enable register button when form is valid', () => {
      setSignUpEmail('test@example.com');
      setSignUpPassword('password123');
      setSignUpRepeatPassword('password123');
      const registerButton = getRegisterButton();
      expect(registerButton.disabled).toBeFalse();
    });
  });

   // Helper functions
   function setEmail(value: string): void {
    component.signInForm.get('email')?.setValue(value);
    fixture.detectChanges();
  }

  function setPassword(value: string): void {
    component.signInForm.get('password')?.setValue(value);
    fixture.detectChanges();
  }

  function setSignUpEmail(value: string): void {
    component.signUpForm.get('email')?.setValue(value);
    fixture.detectChanges();
  }

  function setSignUpPassword(value: string): void {
    component.signUpForm.get('password')?.setValue(value);
    fixture.detectChanges();
  }

  function setSignUpRepeatPassword(value: string): void {
    const repeatPasswordControl = component.signUpForm.get('repeatPassword');
    repeatPasswordControl?.setValue(value);
    repeatPasswordControl?.markAsTouched();
    repeatPasswordControl?.markAsDirty(); 
    repeatPasswordControl?.updateValueAndValidity();  // Ensures validations are re-evaluated
    fixture.detectChanges();
  }

  function getLoginButton(): HTMLButtonElement {
    return debugElement.query(By.css('[test-id="login-button"]')).nativeElement;
  }

  function getRegisterButton(): HTMLButtonElement {
    return debugElement.query(By.css('[test-id="register-button"]')).nativeElement;
  }

});
