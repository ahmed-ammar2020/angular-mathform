import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidator } from '../math-validator';
import { delay, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;

  mathForm = new FormGroup(
    {
      a: new FormControl(this.getRandomNumber()),
      b: new FormControl(this.getRandomNumber()),
      answer: new FormControl(''),
    },
    [MathValidator.addition('a', 'b', 'answer')]
  );

  constructor() {}

  ngOnInit(): void {

    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(150),
        scan( (acc) => {
          return {
            numberSolved: acc.numberSolved + 1,
            startTime: acc.startTime
          }
        }, {
          numberSolved: 0,
          startTime: new Date(),
        })
      )
      .subscribe(({numberSolved, startTime}) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

        this.mathForm.patchValue({
          a: this.getRandomNumber(),
          b: this.getRandomNumber(),
          answer: '',
        });
      });
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
