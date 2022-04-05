import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  registerMode = false;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  toggleRegisterMode() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.httpClient.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
  cancelRegisterMode(event: boolean) {
    console.log('received heer')
    this.registerMode = false;
  }

}
