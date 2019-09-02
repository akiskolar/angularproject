import {Component, OnInit, ViewChild} from '@angular/core';
import {Hero, HttpService} from '../http.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


export class UserDetails {
  userId: number;
  id: number;
  title: string;
  body: string;

  constructor(number: number, number2: number, s: string, s2: string) {
    this.userId = number;
    this.id = number2;
    this.title = s;
    this.body = s2;
  }
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  user: Hero[] = [];
  ud: UserDetails[] = [];

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getUsers();
    this.postUsers();
  }

  displayedColumns: string[] = ['id', 'name', 'username', 'phone'];
  dataSource: MatTableDataSource<Hero>;

  getUsers(): void {
    this.http.getUserFromApi()
      .subscribe(users => {
        this.user = users;
        //this.phones = users;
        this.dataSource = new MatTableDataSource(this.user);
        this.dataSource.paginator = this.paginator;
      });
  }

  postUsers(): void {
    this.http.updateUserFromApi(new UserDetails(133, 101, 'Aklilu', 'Belay'))
      .subscribe( u=>{this.ud=u;
      });
  }

}
