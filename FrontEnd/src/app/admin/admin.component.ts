import { AnimationGroupMetadata } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/userservice';
import { FlashMessagesService } from 'angular2-flash-messages';
import{NavigationExtras,Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

signUpForm:FormGroup;
LoginForm:FormGroup;
signup = { Username: String, Age: String, City: String, State: String, Email: String, password: String };
Login = {Username:String, Email: String, password: String };
showmode:string;
data:any;

  constructor(private fb:FormBuilder,private service:UserService,private http:HttpClient,
    private flash:FlashMessagesService,private router:Router) {
    this.createsignup();
    this.createLoginForm();
   }

  ngOnInit(): void {
  }

createsignup():void{
  this.signUpForm=this.fb.group({
    Username: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
    Age: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(0)]],
    City: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
    State: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
    Email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    Admin:['']
  })

}
createLoginForm():void{
  this.LoginForm=this.fb.group({
      Username:['',[Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

  })

}
onSubmit() {
  console.log(this.signUpForm);
  this.service.postUser(this.signUpForm.value).subscribe(res => {
    console.log(res);
    this.flash.show('User Registered. Login by clicking the SignIn button below!!',{timeout:10000});
  },
  (err)=>{
    console.log(err);
    this.flash.show('User with the entered Email already exists ',{timeout:8000});
    
   });
}
 // To make one form visible after clicking submit button in another form within the same page use *ngIf
  //showmode==register in one form and in another form  the opposite the form first to be visible should be declared in constructor with 
  //this.showmode='register' and to make other form visible using click function set this.showmode='unregister'.




Add(){
  this.service.loginUser(this.LoginForm.value).subscribe((res) => {
    this.data=res;
  
    console.log(this.data.token);
    
    localStorage.setItem('token', this.data.token);
     var set=localStorage.getItem('token');
      console.log(set);

      this.router.navigate(['cart']);
      
  
  });

//Another way of emitting data between components is using this.router.getCurrentNavigation in childComp in parComp sending data using NavigationExtras={state:data} in childcomp writing as navigation?.extras.state
 
}




}
