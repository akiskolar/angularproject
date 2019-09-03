import {Component, OnInit, ViewChild} from '@angular/core';
import {Todo, HttpService, Hero} from '../http.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  user: Hero[] = [];
  todo: Todo[] = [];

  options: FormGroup;
  selectedDom: string;
  selectedPhone: string;

  enabled:boolean = true;

  constructor(private http: HttpService, fb: FormBuilder) {
    this.options = fb.group({
      color: 'primary',
      fontSize: [16, Validators.min(10)],
    });
  }

  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }

  onRowClicked($event) {
    console.log('Row clicked: ', $event);
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.getUsers();
    this.getUsersFromTodos();
  }

  displayedColumns: string[] = ['id', 'name', 'username', 'phone'];
  dataSource: MatTableDataSource<Hero>;

  displayedColumns2: string[] = ['userId', 'id', 'title', 'completed'];
  dataSource2: MatTableDataSource<Todo>;

  getUsers(): void {
    this.http.getUserFromApi()
      .subscribe(users => {
        this.user = users;
        //this.phones = users;
        this.dataSource = new MatTableDataSource(this.user);
        this.dataSource.paginator = this.paginator;
      });
  }

  getUsersFromTodos(): void {
    this.http.getTodos()
      .subscribe(users => {
        this.todo = users;
        //this.phones = users;
        this.dataSource2 = new MatTableDataSource(this.todo);
        //this.dataSource2.paginator = this.paginator2;
      });
  }


  values(row: any) {
    console.log('Row clicked: ', row);
    alert(row.completed +" "+ row.id +" "+  row.title +" "+ row.userId);
  }
}
