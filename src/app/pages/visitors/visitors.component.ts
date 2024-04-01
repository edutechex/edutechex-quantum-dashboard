import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit{

  visitorDataSource: any;
  visitorData: any;

  public displayedColumns = [
    'id',
    'ip',
    'city',
    'region',
    'postal',
    'country',
    'createdOn',
  ];
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );


  constructor(
    private appSrvc : AppService
  ){}

ngOnInit(): void {
  this.getVisitorDatails();
}
  getVisitorDatails(){
    this.appSrvc.getVisitorsDetails().subscribe((res:any)=>{
      this.visitorData = res.reverse();
      this.visitorDataSource = new MatTableDataSource(res);
      this.visitorDataSource.paginator = this.paginator;
      this.visitorDataSource.sort = this.sort;
    })
  }
}
