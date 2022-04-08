import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  constructor() { }

  createDb() {
    const heroes = [
      { id: 11, name: 'Iron Man'},
      { id: 12, name: 'Hulk'},
      { id: 13, name: 'Captain America'},
      { id: 14, name: 'Thor'},
      { id: 15, name: 'Hackeye'},
      { id: 16, name: 'Black Widow'},
      { id: 17, name: 'Dr. Strange'},
      { id: 18, name: 'Spider-Man'},
      { id: 19, name: 'Falcon'},
      { id: 20, name: 'War Machine'},
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return (
      heroes.length > 0 ?
        Math.max(...heroes.map(hero => hero.id)) + 1 :
        11
    );
  }
}
