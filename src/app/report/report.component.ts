import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../user';
import { UserService } from '../user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  reportForm: FormGroup;
  users: IUser[];
  submitted = false;

  public dropdownList = [];
  selectedItems = [];
  dropdownSettings : IDropdownSettings;

  constructor( private formBuilder: FormBuilder, private userService: UserService ) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(next => {

      this.users = next;
      for (let i = 0; i < this.users.length; i ++) {

        this.dropdownList.push({ id: this.users[i].id, name: this.users[i].name});
      }

      // this.dropdownList = [

      //   {id: 5, name: 'Push'},
      //   {id: 6, name: 'Log'}
      // ]
      console.log(this.dropdownList);
    });

    console.log(this.dropdownList);

    this.reportForm = this.formBuilder.group({

      listUser: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.dropdownSettings = {

      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.selectedItems = []
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  
  // convenience getter for easy access to form fields
	get f() { return this.reportForm.controls; }

  onSubmit() {

    this.submitted = true;

		// stop here if form is invalid
		if (this.reportForm.invalid) {

			return;
		}

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.reportForm.value, null, 4));
  }

  onReset() {

		this.submitted = false;
		this.reportForm.reset();
	}

  onSelect() {


  }

  offSelect() {

    
  }
  
}
