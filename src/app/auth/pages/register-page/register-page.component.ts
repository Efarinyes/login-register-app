import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder)
  private authService = inject( AuthService )
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  singUp() {
    const { name, email, password } = this.myForm.value;
    this.authService.signUp( name, email, password )
      .subscribe({
        next: () => {
          Swal.fire('Registre','El registre ha sigut un èxit', 'success' )
            .then( () => {
              this.router.navigateByUrl('/dashboard')
            })
        }
      })
  }
}
