import { AbstractControl } from '@angular/forms';

export class MathValidators {
    static addition(target:string,srcOne:string,srcTwo:string){
        return (form:AbstractControl)=>{
            const sum = form.value[target];
            const numOne = form.value[srcOne];
            const numTwo = form.value[srcTwo];
            if(numOne + numTwo === parseInt(sum)){
                return null;
            }
            return { addition:true };
        };
    }
}
