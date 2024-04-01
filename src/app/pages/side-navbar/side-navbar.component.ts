import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit{

  constructor(
    public appService : AppService,
    public router : Router,
    private location: Location
  ){}

  ngOnInit(): void {
    this.appService.openSection('dashboard');
  }

  signout(){
    this.router.navigateByUrl('');
    this.location.replaceState('/');
  }
}
