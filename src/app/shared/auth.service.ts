import { Injectable } from '@angular/core';
import{AngularFireAuth}from '@angular/fire/compat/auth'
import{GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider}from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private router:Router) { }
//login method
login(email:string,password:string){
  this.fireauth.signInWithEmailAndPassword(email,password).then( (res) =>{
   localStorage.setItem('token','true');
   

   if(res.user?.emailVerified==true){
    this.router.navigate(['/dashboard']);
   }
   else
   {
    this.router.navigate(['/verify-email']);
   }
  }, err =>{
    alert(err.message)
    this.router.navigate(['/login']);
  }
  )
}
//register method
register(email:string,password:string){
  this.fireauth.createUserWithEmailAndPassword(email,password).then( () =>{
   alert('Registration is successfull')
   this.router.navigate(['/login']);
  }, err =>{
    alert(err.message)
    this.router.navigate(['/register']);
  }
  )
}
//signout
logout(){
  this.fireauth.signOut().then( () =>{
    localStorage.removeItem('token');
   this.router.navigate(['/login']);
  }, err =>{
    alert(err.message)
    
  }
  )
}
//forgot password
forgotPassword(email:string){
  this.fireauth.sendPasswordResetEmail(email).then( () =>{
   alert('Something went wrong')
   this.router.navigate(['/verify-email']);
  }, err =>{
    alert(err.message)
    
  }
  )
}
//email verification
sendEmailForVerification(user: any) {
  user.sendEmailForVerification().then((res:any)=>{
    this.router.navigate(['/verify-email']);
  }, (err :any)=>{
    alert('Something went wrong.Not able to send mail')
    
  }
  )
}
//sign in with google 
googleSignIn(){
  return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
    this.router.navigate(['/dashboard']);
    localStorage.setItem('token',JSON.stringify(res.user?.uid));
  },
  err=>{
  alert(err.message);
  })
}

}
