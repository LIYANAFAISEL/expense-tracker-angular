import { TestBed } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('SigninComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, SigninComponent, ReactiveFormsModule],
    })
    .compileComponents();
  });

});
