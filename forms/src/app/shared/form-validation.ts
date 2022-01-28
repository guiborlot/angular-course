import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

export class FormValidation {

    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: AbstractControl) => {
            if (formArray instanceof FormArray) {
                const totalChecked = formArray.controls.map(v => v.value)
                    .reduce((prev, next) => (next ? prev + next : prev), 0);
                return totalChecked >= min ? null : { required: true };
            }
            throw new Error('formArray is not an instance of FormArray');
        }
        return validator;
    }

    static cepValidator(control: FormControl){

        const cep = control.value
        if (cep && cep !== ''){
            const validacep = /^[0-9]{5}-[0-9]{3}$/;
            return validacep.test(cep) ? null : { cepInvalido : true }
        }

        return null;
    }

    static equalsTo(otherField: string){
        const validator = (formControl: FormControl) => {
            if(otherField == null){
                throw new Error('É necessário informar um campo.');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls){
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field){
                throw new Error('É necessário informar um campo válido.');
            }

            if(field.value !== formControl.value){
                return { equalsTo : otherField};
            }

            return null;
        };
        return validator;
    }
}