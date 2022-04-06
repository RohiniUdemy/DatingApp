import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegisterMode = new EventEmitter();

  constructor(private accountService: AccountsService, public toaster: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.model);
    this.accountService.register(this.model).subscribe(response => {
      this.cancel();
    }, error => {
      console.log(error);
      this.toaster.error(error.error);
    });

  }

  cancel() {
    console.log('cancel');
    this.cancelRegisterMode.emit(false);
  }

}
