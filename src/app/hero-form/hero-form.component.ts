import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  powers = ['Realy Smart', 'Supper Flexible', 'Super Hot', 'Weather Changer'];
  model = new Hero(18, 'Dr IQ 3000', this.powers[0], 'Chuck Overstreet');
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.model = new Hero(42, '', '')
  }

}
