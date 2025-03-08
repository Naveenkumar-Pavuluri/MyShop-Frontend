import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formbulider = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.formbulider.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  });

  login(){
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe((result:any)=>{
      localStorage.setItem("token",result.token);
      localStorage.setItem("user",JSON.stringify(result.user));
      this.router.navigateByUrl("/");
    })
  }
}
