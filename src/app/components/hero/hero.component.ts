import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlienModel } from 'src/app/models/Container.model'; 
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  formValue!: FormGroup;
  alienModelObj: AlienModel = new AlienModel();
  alienData!: any;
  showAdd!: boolean
  showUpdate!: boolean


  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      gender: [''],
      status : ['']
    })
    this.getAllAliens();
  }
  clickAddAlien(){
    this.formValue.reset
    this.showAdd = true
    this.showUpdate = false
  }
  postAlienDetails(){
    this.alienModelObj.name = this.formValue.value.name;
    this.alienModelObj.email = this.formValue.value.email;
    this.alienModelObj.gender = this.formValue.value.gender;
    this.alienModelObj.status = this.formValue.value.status;

    this.api.postAlien(this.alienModelObj)
    .subscribe(res=>{
      console.log(res);
      this.getAllAliens();
      alert("Alien added successfully");
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset()
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllAliens(){
    this.api.getAlien()
    .subscribe(res=>{
      this.alienData = res;
    })
  }
  deleteAlienData(row: any){
    this.api.deleteAlien(row.id)
    .subscribe(res=>{
      console.log(row.id)
      alert("Alien Deleted");
      this.getAllAliens();
    })
  }
  onEdit(row: any){
    this.showAdd = false
    this.showUpdate = true
    this.alienModelObj.id = row.id
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['status'].setValue(row.status);
  }
  updateAlienDetails(){
    this.alienModelObj.name = this.formValue.value.name;
    this.alienModelObj.email = this.formValue.value.email;
    this.alienModelObj.gender = this.formValue.value.gender;
    this.alienModelObj.status = this.formValue.value.status;

    this.api.updateAlien(this.alienModelObj, this.alienModelObj.id)
    .subscribe(res=>{
      console.log(res);
      this.getAllAliens();
      alert("Alien updated successfully");
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset()
    },
    err=>{
      alert("Something went wrong");
    })
  }

}
