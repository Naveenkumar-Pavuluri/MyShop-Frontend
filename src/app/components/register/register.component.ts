import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formsbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  registerForm = this.formsbuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.minLength(5)]]
  });

  register(){
    let value = this.registerForm.value;
    this.authService.register(value.name!,value.email!,value.password!).subscribe((result)=>{
      alert("Registration sucessful");
      this.router.navigateByUrl("/login");
    })
  }

}
