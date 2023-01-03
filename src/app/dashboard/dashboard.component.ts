import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // username
  user="";

  //to hold account to be dleted
  acno:any;
  depositForm=this.fb.group({

  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  amt:['',[Validators.required,Validators.pattern('[0-9]*')]]
})
withdrawForm=this.fb.group({

  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  amt:['',[Validators.required,Validators.pattern('[0-9]*')]]
})
constructor(private fb:FormBuilder,private api:ApiService ,private router:Router) { }


  ngOnInit(): void {
    if (localStorage.getItem("username")){
      this.user =  localStorage.getItem("username") ||''
    }
    if(!localStorage.getItem("username")){
      alert('please Log In')
      this.router.navigateByUrl('')
    
    }
    
  }

withdraw(){ 
  var acno=this.withdrawForm.value.acno
  var pswd=this.withdrawForm.value.pswd
 var amt=this.withdrawForm.value.amt
  if(this.withdrawForm.valid){
    //asynchronous
    this.api.withdraw(acno,pswd,amt)
    .subscribe((result:any)=>{

      alert(result.message)
    },
    //if client error  -4xx)
    (result:any)=>{
      alert(result.error.message)
    }
    )
    
    
  }
  else{
    alert("Invalid Form")
  }

}


deposit(){ 
  var acno=this.depositForm.value.acno
  var pswd=this.depositForm.value.pswd
 var amt=this.depositForm.value.amt
  if(this.depositForm.valid){
    //asynchronous
    this.api.deposit(acno,pswd,amt)
    .subscribe((result:any)=>{

      alert(result.message)
    },
    //if client error  -4xx)
    (result:any)=>{
      alert(result.error.message)
    }
    )
    
    
  }
  else{
    alert("Invalid Form")
  }

}
//logout
logout(){
  //remove existing user details from localstorage
  localStorage.removeItem("username")
  localStorage.removeItem("token")
  localStorage.removeItem("currentAcno")

  //redirect to login page
this.router.navigateByUrl('')


}
//delete
delete(){
  this.acno = localStorage.getItem("currentAcno")
}
// cancel
cancel(){
  this.acno=""
}
//onDelete
Delete(event:any){
  this.api.deleteAcno(event)
  .subscribe((result:any)=>{
    alert(result.message)
    this.logout()
  },
  result=>{
    alert(result.error.message)
  }
  )

}

}