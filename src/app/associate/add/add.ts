import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Associate } from '../../_shared/associate';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { associateModel } from '../../../model/associate';

@Component({
  selector: 'app-add',
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule, CommonModule, MatFormFieldModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add implements OnInit, OnDestroy {

  _form!: FormGroup;
  dialogata: any;
  title = 'Add Associate';
  isAdd = true;
  editData: associateModel = {
    id: 0,
    name: '',
    address: '',
    creditlimit: 0,
    status: false
  };

  constructor(private service: Associate, private builder: FormBuilder,
    private ref: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
    this.dialogata = this.data;
    if (this.dialogata.id > 0) {
      this.title = 'Edit Associate';
      this.isAdd = false;
      this.service.Get(this.dialogata.id).subscribe(item => {
        this.editData = item;
        this._form.setValue({
          id: this.editData.id,
          name: this.editData.name,
          address: this.editData.address,
          creditLimit: this.editData.creditlimit,
          status: this.editData.status,
        })
      })
    }
    this._form = this.builder.group({
      id: this.builder.control({ disabled: true, value: 0 }),
      name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      address: this.builder.control('', Validators.compose([Validators.required])),
      creditLimit: this.builder.control(0, Validators.compose([Validators.required])),
      status: this.builder.control(true)
    });
  }
  ngOnDestroy(): void {

  }

  close() {
    this.ref.close();
  }

  save() {
    if (this._form.valid) {
      let _data: associateModel = {
        id: this._form.value.id as number,
        name: this._form.value.name as string,
        address: this._form.value.address as string,
        creditlimit: this._form.value.creditLimit as number,
        status: this._form.value.status as boolean
      };
      if (this.isAdd) {
        this.service.Create(_data).subscribe(item => {
          alert('Associate created successfully');
          this.ref.close();
        });
      } else {
        _data.id = this._form.getRawValue().id;
        this.service.Update(_data).subscribe(item => {
          alert('Associate updated successfully');
          this.ref.close();
        })
      }
  }
}
}
