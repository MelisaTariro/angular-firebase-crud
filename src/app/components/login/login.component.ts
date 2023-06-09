import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

email:string='';
password:string='';

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
login()
{   if(this.email==''){
    alert('Please enter email')
    return;
}
if(this.password==''){
  alert('Please enter passwprd')
  return;
}
 this.auth.login(this.email,this.password)
 this.email='';
 this.password='';
}
signInWithGoogle(){
  this.auth.googleSignIn();
}
}
