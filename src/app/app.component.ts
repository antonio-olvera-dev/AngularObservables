import { Component } from '@angular/core';
import { from, fromEvent, interval, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  evento: String = "";
  promesa: any ;
  ajaxRes:any ;
  interval: String = "";
  operaciones: String = "";
  constructor() { }

  ngOnInit(): void {
    this.start();
  }


  start() {

    //---Eventos---
    const html = document.getElementsByTagName('html');
    const mouseMoves = fromEvent(html, 'mousemove');
    const mouseMovesSubscription = mouseMoves.subscribe((evt: MouseEvent) => {

      this.evento = `Coords: ${evt.clientX} X ${evt.clientY}`;
    });

    //---Promesas---
    const data = from(fetch('https://pokeapi.co/api/v2/pokemon/pikachu'));
    data.subscribe(async (res) => {
      this.promesa = await res.json();
    });

    //---Ajax---
  const apiData = ajax('https://pokeapi.co/api/v2/pokemon/pikachu');
  apiData.subscribe(res => {
    this.ajaxRes = res.response
  });

    //---Interval---
    const secondsCounter = interval(1000);
    const subscription = secondsCounter.subscribe(n => {
      this.interval = `${n + 1}`
    });

    //---Operaciones---
    const nums = of(1, 2, 3);
    const squareValues = map((val: number) => val * val);
    const squaredNums = squareValues(nums);
    this.operaciones = "Iniciales: 1, 2, 3. Resultado: "
    squaredNums.subscribe(x => this.operaciones += `${x}, `);



  }


}
