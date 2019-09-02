import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';


export interface Hero {
  id:string;
  username:string;
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

  constructor(private httpClient: HttpClient) {
  }

  public getUserFromApi(): Observable<Hero[]>{


    return this.httpClient.get<Hero[]>('http://jsonplaceholder.typicode.com/users')
      .pipe(
        catchError(this.handleError<Hero[]>('getting users api call Failed', []))
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
