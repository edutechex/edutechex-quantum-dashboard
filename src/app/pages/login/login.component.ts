import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { account_validation_messages } from './validation-error-message/validation-error-message';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm: any = FormsModule;
  public validationErrorMsg : any;
  public errorMessage = null;
  public hide: boolean = true;
  public invalid: boolean = false;
  public authenticating: boolean = false;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    public appService: AppService
  ){}

  ngOnInit(): void {
    this.validationErrorMsg = this.getErrorMessage();
    this.loginForm = this.fb.group({
      userName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  // Get All Validation message
  private getErrorMessage(){
    return account_validation_messages
  }

  public onLogin(){
    this.authenticating = true;
    this.invalid = false;
    this.appService.loginDetails(this.loginForm.value).subscribe({
      next:(res) =>{
        this.router.navigateByUrl('/dashboard');
      },
      error: (error)=>{
        this.errorMessage = error.error.message;
        this.invalid = true;
      }
    })
  }
}
