import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/services/app.service';
import { AddOrEditTeamComponent } from './add-or-edit-team/add-or-edit-team.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  teamDataSource: any = FormGroup;
  success:boolean = false;
  err:boolean = false;
  dialogRef: any;
  teamData : any;
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
    'name',
    'about',
    'edit/delete',
  ];
  constructor(
    public appService: AppService,
    public dialog: MatDialog
  ){
    this.getTeam();
    this.teamDataSource = new MatTableDataSource(this.teamData);
  }

  ngOnInit(): void {
    
  }

  getTeam(){
    this.appService.getTeam().subscribe({
      next:(res:any)=>{
        this.teamData = res;
        this.teamDataSource = new MatTableDataSource(res);
        this.teamDataSource.paginator = this.paginator;
        this.teamDataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  deleteTeamItem(){
    this.appService.deleteTeam(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted Successfully');
        this.getTeam();
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    });
    this.deleteId = 0;
  }

  openAddTeamModal(){
    const dialogRef = this.dialog.open(AddOrEditTeamComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      width:'600px',
      height:'auto'
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getTeam();
      // this.appService.openSection('aboutUs')
    })
  }

  openEditTeamModal(data: any){
    const dialogRef = this.dialog.open(AddOrEditTeamComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      width:'600px',
      height:'auto',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getTeam();
      // this.appService.openSection('aboutUs')
    })
  }
  openDeleteTeamConfirm(id: number){
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
