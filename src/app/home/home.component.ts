import {Component, OnInit} from '@angular/core';
import {Hero, HttpService} from '../http.service';
import {MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  user: Hero[] = [];
  phones: Hero[] = [];
  options: FormGroup;
  selectedDom: string;
  selectedPhone: string;

  constructor(private http: HttpService, fb: FormBuilder) {
    this.options = fb.group({
      color: 'primary',
      fontSize: [16, Validators.min(10)],
    });
  }

  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }

  ngOnInit() {
    this.getUsers();
  }

  displayedColumns: string[] = ['id', 'name', 'username', 'phone'];
  dataSource: MatTableDataSource<Hero>;

  getUsers(): void {
    this.http.getUserFromApi()
      .subscribe(users => {
        this.user = users;
        //this.phones = users;
        this.dataSource = new MatTableDataSource(this.user);
      });
  }


}
