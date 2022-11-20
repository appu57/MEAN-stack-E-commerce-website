import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserService } from '../services/userservice';
import { Router, NavigationExtras } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {



  data: any;
  public showmode: string;
  values: any;
  err: any;
  
  user: any;
  LoginForm: FormGroup;
  SignUpForm: FormGroup; //If form is not working     "strictPropertyInitialization": false, in tsconfig.json
  signup = { Username: String, Age: String, City: String, State: String, Email: String, password: String };
  Login = { Email: String, password: String };
  formErrors = {
    'Username': '',
    'Age': '',
    'City': '',
    'State': '',
    'Email': '',
    'Password':''
  };

  validationMessages = {
    'Username': {
      'required': '*Name is required',
      'minlength': '*Should have atleast 2 character',
      'maxlength': '*Should not exceed 25 characater'
    },
    'password': {
      'required': '*Field is required',

    },
    'Age': {
      'required': 'Field is required',
      'minlength': 'Min Length is 0',
      'maxlength': 'Max length is 3'
    },
    'City': {
      'required': '*Name is required',
      'minlength': '*Should have atleast 2 character',
      'maxlength': '*Should not exceed 25 characater'
    },
    'State': {
      'required': '*Name is required',
      'minlength': '*Should have atleast 2 character',
      'maxlength': '*Should not exceed 25 characater'
    },
    'Email': {
      'required': '*Field is required ',
      'email': '*Enter  a valid format'
    },
  };



  constructor(private fb: FormBuilder, private http: HttpClient,
    private service: UserService, private router: Router,
    private flash: FlashMessagesService,

  ) {
    this.signinForm();
    this.loginForm();
    this.showmode = 'register';

  }


  ngOnInit() {
    this.http.get("http://localhost:3000/users/signup").subscribe((res) => {
      this.user = res;
    })
  }

  signinForm(): void {
    this.SignUpForm = this.fb.group({
      Username: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
      Age: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(0)]],
      City: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
      State: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });

  }

  loginForm(): void {
    this.LoginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    });
  }




  onSubmit() {
    console.log(this.SignUpForm);
    this.service.postUser(this.SignUpForm.value).subscribe(res => {
      console.log(res);

      this.flash.show('User Registered. Login by clicking the SignIn button below!!', { timeout: 10000 });
    },
      (err) => {
        this.flash.show('User with the entered Email already exists ', { timeout: 8000 });

      });
  }

  login() { // To make one form visible after clicking submit button in another form within the same page use *ngIf
    //showmode==register in one form and in another form  the opposite the form first to be visible should be declared in constructor with 
    //this.showmode='register' and to make other form visible using click function set this.showmode='unregister'.
    this.showmode = 'unregister';
  }

  SignUp() {
    this.showmode = 'register';
  }

  Add() {
    this.service.loginUser(this.LoginForm.value).subscribe((res) => {
      console.log(res);
      this.data = res;
      const value = this.data.user['0']._id;     
      localStorage.setItem('token', this.data.token);
      localStorage.setItem('id',value);
      console.log(localStorage.getItem('token'));
      
      this.router.navigate(['home'], { state: value });


      //Another way of emitting data between components is using this.router.getCurrentNavigation in childComp in parComp sending data using NavigationExtras={state:data} in childcomp writing as navigation?.extras.state
    })


  }

}
