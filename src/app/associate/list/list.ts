import { Component, OnInit, OnDestroy, viewChild, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Associate } from '../../_shared/associate';
import { associateModel } from '../../../model/associate';
import { Subscription } from 'rxjs';
import { Add } from '../add/add';


@Component({
  selector: 'app-list',
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})

export class List implements OnInit, OnDestroy {
  _list: associateModel[] = [];
  subs = new Subscription();
  displayHeaders: string[] = ['id', 'name', 'address', 'creditlimit', 'status', 'action'];
  dataSource!: MatTableDataSource<associateModel>;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private service: Associate, private dialog: MatDialog) {

  }

  GetAllList() {
    let _sub = this.service.GetAll().subscribe(item => {
      this._list = item;
      this.dataSource = new MatTableDataSource(this._list);
    });
    this.subs.add(_sub);
  }
  UpdateList() {
    let _sub = this.service.GetAll().subscribe(item => {
      this._list = item;
      this.dataSource.data = this._list;
      this.table.renderRows();
    });
    this.subs.add(_sub);
  }

  ngOnInit(): void {
    this.GetAllList();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  add() {
    this.openPopup(0);
  }
  openPopup(id: any) {
    this.dialog.open(Add, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id
      }
    }).afterClosed().subscribe(s=> {
      this.UpdateList();
    })
  }
  Edit(id:any){
    this.openPopup(id);
  }
  Delete(id:any){
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.Delete(id).subscribe(item=>{
        alert("Record deleted successfully");
        this.UpdateList();
      })
  }
}
}
