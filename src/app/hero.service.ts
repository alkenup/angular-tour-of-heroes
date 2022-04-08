import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesURL = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    return (
      this.http
        .get<Hero[]>(this.heroesURL)
        .pipe(
          tap(_ => this.log('HeroService: fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        )
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;
    return (
      this.http
        .get<Hero>(url)
        .pipe(
          tap(_ => this.log(`HeroService: fetched hero id=${id}`)),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
        )
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return (
      this.http
        .post<Hero>(this.heroesURL , hero, this.httpOptions)
        .pipe(
          tap((newHero: Hero) => this.log(`HeroService: added hero w/ id=${newHero.id}`)),
          catchError(this.handleError<Hero>('addHero'))
        )
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return (
      this.http
        .put(this.heroesURL, hero, this.httpOptions)
        .pipe(
          tap(_ => this.log(`HeroService: updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        )
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${ this.heroesURL }/${ id }`;
    return (
      this.http
        .delete<Hero>(url, this.httpOptions)
        .pipe(
          tap(_ => this.log(`HeroService: deleted hero id=${ id }`)),
          catchError(this.handleError<Hero>('deleteHero'))
        )
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([])
    }
    const url = `${this.heroesURL}/?name=${ term }`;
    return (
      this.http
        .get<Hero[]>(url)
        .pipe(
          tap( x => x.length ?
            this.log(`HeroService: found ${ x.length } heroes matching ${ term }`) :
            this.log(`HeroService: no heroes matching "${ term }"`)
          ),
          catchError(this.handleError<Hero[]>('searchHeroes', []))
        )
    )
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`HeroService: ${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }
}
