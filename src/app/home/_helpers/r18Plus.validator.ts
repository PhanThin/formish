import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';


export function r18PlusValidator(): ValidatorFn {
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        const date = control.value.split('-');

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        if (date.errors) {

            return;
        }

        if (yyyy - date[0] < 18) {
            
            return { 'r18Plus': true };
        } 
        else if (yyyy == date[0]) {

            if (mm < date[1]) {

                return { 'r18Plus': true };
            }

            else if (mm == date[1]) {

                if (dd < date[2]) {

                    return { 'r18Plus': true };
                }
            }
        }
        return null;
    };
}