import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountsService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  login(): void {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
    })
  }

  logout() {
    this.accountService.logout();
  }

}
