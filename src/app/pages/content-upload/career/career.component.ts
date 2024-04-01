import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/services/app.service';
import { AddOrEditCareerComponent } from './add-or-edit-career/add-or-edit-career.component';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit{
  careerDataSource: any = FormBuilder;
  success:boolean = false;
  err:boolean = false;
  dialogRef: any;
  careerData: any;

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog ={} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') delteDialog = {} as TemplateRef<any>;

  public displayedColumns = [
    'id',
    'image',
    'title',
    'about',
    'edit/delete',
  ];
  deleteId: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog,
  ){
    this.getCareer();
    this.careerDataSource = new MatTableDataSource(this.careerData);
  }

  ngOnInit(): void {
    
  }

  getCareer(){
    this.appService.getCareer().subscribe({
      next:(res:any)=>{
        this.careerData = res;
        this.careerDataSource = new MatTableDataSource(res);
        this.careerDataSource.paginator = this.paginator;
        this.careerDataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  deleteCareerItem(){
    this.appService.deleteCareer(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted Successfully');
        this.getCareer();
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    });
    this.deleteId = 0;
  }

  openAddCareerModal(){
    const dialogRef = this.dialog.open(AddOrEditCareerComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      width:'600px'
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getCareer();
      // this.appService.openSection('aboutUs')
    })
  }

  openEditCareerModal(data: any){
    const dialogRef = this.dialog.open(AddOrEditCareerComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      width:'600px',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getCareer();
      // this.appService.openSection('aboutUs')
    })
  }

  openDeleteCareerConfirm(id: number){
    this.deleteId = id;
    const dialogRef = this.dialog.open(this.delteDialog,{
      width:'auto',
    })
  }

  public closeModal() {
    this.dialog.closeAll();
  }

  //Success or error msg dialog after form submissions or performing some actions
  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 1000;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }
}
