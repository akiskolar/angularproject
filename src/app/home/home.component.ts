import {Component, OnInit, ViewChild} from '@angular/core';
import {Todo, HttpService, Hero} from '../http.service';
import {MAT_CHECKBOX_CLICK_ACTION, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check-indeterminate'}
  ]
})

export class HomeComponent implements OnInit {

  user: Hero[] = [];
  todo: Todo[] = [];

  options: FormGroup;
  selectedDom: string;
  selectedPhone: string;

  enabled: boolean = true;

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
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit() {
    this.getUsers();
    this.getUsersFromTodos();
  }

  displayedColumns2: string[] = ['id', 'name', 'username', 'phone'];
  dataSource2: MatTableDataSource<Hero>;

  displayedColumns: string[] = ['select', 'userId', 'id', 'title', 'completed'];
  dataSource: MatTableDataSource<Todo>;
  selection = new SelectionModel<Todo>(true, []);
  getUsers(): void {
    this.http.getUserFromApi()
      .subscribe(users => {
        this.user = users;
        //this.phones = users;
        this.dataSource2 = new MatTableDataSource(this.user);
        this.dataSource2.paginator = this.paginator;
      });
  }

  getUsersFromTodos(): void {
    this.http.getTodos()
      .subscribe(users => {
        this.todo = users;
        //this.phones = users;
        this.dataSource = new MatTableDataSource(this.todo);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
  }


  values(row: any) {
    console.log('Row clicked: ', row);
    alert(row.completed + ' ' + row.id + ' ' + row.title + ' ' + row.userId);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Todo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
