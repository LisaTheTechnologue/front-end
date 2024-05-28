import { AfterViewInit, Component, OnInit, VERSION, ViewChild, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Trip } from '../_shared/models/trip.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PublicService } from '../_shared/services/public.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  empForm: FormGroup;
 
  constructor(private fb: FormBuilder) {}
 
  ngOnInit() {
    this.empForm = this.fb.group({
      employees: this.fb.array([])
    });
  }
 
  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }
 
  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([])
    });
  }
 
  addEmployee() {
    this.employees().push(this.newEmployee());
  }
 
  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }
 
  employeeSkills(empIndex: number): FormArray {
    return this.employees()
      .at(empIndex)
      .get('skills') as FormArray;
  }
 
  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: ''
    });
  }
 
  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }
 
  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }
}
