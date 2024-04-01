import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public adminDataSource: MatTableDataSource<any>;

  public displayedColumns = [
    'id',
    'name',
    'userName',
    'Password',
  ];
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  adminData: any;
  visitorData: any;

  constructor(
    public appService: AppService,
  ){ this.adminDataSource = new MatTableDataSource(this.adminData);}
  
  ngOnInit(): void {
    this.getAdminData();
    // this.visitorData = sessionStorage.getItem('visitorDetails');
    // const data = JSON.parse(this.visitorData);
    // console.log(data);
  }

  getAdminData(){
    this.appService.getAdminDetails().subscribe((res:any)=>{
      this.adminData = res;
      this.adminDataSource = new MatTableDataSource(res);
      this.adminDataSource.paginator = this.paginator;
      this.adminDataSource.sort = this.sort;
    })
  }

}
