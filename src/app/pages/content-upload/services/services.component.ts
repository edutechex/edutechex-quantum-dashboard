import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/services/app.service';
import { AddOrEditServicesComponent } from './add-or-edit-services/add-or-edit-services.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  servicesDataSource: any = FormGroup;
  success:boolean = false;
  err:boolean = false;
  dialogRef: any;
  services: any;
  deleteId: any;

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
    'content',
    'edit/delete',
  ];


  constructor(
    public appService : AppService,
    public dialog : MatDialog
  ){
    this.getServices();
    this.servicesDataSource = new MatTableDataSource(this.services);
  }

  ngOnInit(): void {
    
  }

  getServices(){
    this.appService.getServices().subscribe({
      next:(res)=>{
        this.services = res;
        this.servicesDataSource = new MatTableDataSource(this.services);
        this.servicesDataSource.paginator = this.paginator;
        this.servicesDataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  deleteServiceItem(){
    this.appService.deleteService(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted Successfully');
        this.getServices();
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    });
    this.deleteId = 0;
  }

  openAddServiceModal(){
    const dialogRef = this.dialog.open(AddOrEditServicesComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getServices();
      // this.appService.openSection('aboutUs')
    })
  }

  openEditServiceModal(data: any){
    const dialogRef = this.dialog.open(AddOrEditServicesComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getServices();
      // this.appService.openSection('aboutUs')
    })
  }

  openDeleteServiceConfirm(id: number){
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
