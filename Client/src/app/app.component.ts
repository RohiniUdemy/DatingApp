import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from './_services/accounts.service';
//import { Console } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountsService) { }

  ngOnInit() {
    this.accountService.setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }

  
}
