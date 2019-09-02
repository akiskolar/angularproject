import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {UserDetails} from './home/home.component';


export interface Hero {
  id:string;
  username:string;
  phone:string;
  website:string;
  address: Array<string>;
  company:Array<string>;
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private getUsers = 'http://jsonplaceholder.typicode.com/users';  // URL to web api
  private postUsers = 'http://jsonplaceholder.typicode.com/posts/1';

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

  public updateUserFromApi(ud: UserDetails): Observable<UserDetails[]>{
    return this.httpClient.put<UserDetails[]>(this.postUsers, ud, this.httpOptions)

      .pipe(
        catchError(this.handleError<UserDetails[]>('updating users api call Failed', []))
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
