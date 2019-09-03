import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';


export interface Hero {
  id:number;
  name:string;
  username:string;
  phone:number;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private getUsers = 'http://jsonplaceholder.typicode.com/users';  // URL to web api
  private todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {
  }

  public getUserFromApi(): Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(this.getUsers)
      .pipe(
        catchError(this.handleError<Hero[]>('getting users api call Failed', []))
      );
  }

  public getTodos(): Observable<Todo[]>{
    return this.httpClient.get<Todo[]>(this.todoUrl)
      .pipe(
        catchError(this.handleError<Todo[]>('getting todo api call Failed', []))
      );
  }


















  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    /*this.messageService.add(`HeroService: ${message}`);*/
  }
}
