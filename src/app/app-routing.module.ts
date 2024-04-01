import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SideNavbarComponent } from './pages/side-navbar/side-navbar.component';

const routes: Routes = [
  {
    path:'',
    title: 'Login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:SideNavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
