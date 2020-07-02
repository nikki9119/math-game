import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay,filter,scan } from 'rxjs/operators'
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secsPerSoln = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },[MathValidators.addition('answer','a','b')]);

  get a(){
    return this.mathForm.value.a;
  }

  get b(){
    return this.mathForm.value.b;
  }

  constructor() { }

  ngOnInit(): void {

    this.mathForm.statusChanges.pipe(
      filter(value=>value === 'VALID'),
      delay(100),
      scan((acc)=>{
        return{
          numSolved: acc.numSolved+1,
          startTime:acc.startTime
        }
      },{ numSolved:0, startTime: new Date() })
    ).subscribe(({ numSolved,startTime })=>{
      this.secsPerSoln = (new Date().getTime() - startTime.getTime())/numSolved/1000;
      this.mathForm.setValue({
        a:this.randomNumber(),
        b:this.randomNumber(),
        answer:''
      });
    });
  }

  randomNumber(){
    return Math.floor(Math.random() * 10);
  }

}
