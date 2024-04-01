import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addCareer, addPartner, addServices, addTeam, editCareer, editPartner, editServices, editTeam } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = "https://api.edutechex-quantum.com/api";


  public dashboard : boolean = false;
  public visitors : boolean = false;
  public services : boolean = false;
  public team : boolean = false;
  public career : boolean = false;
  public partner : boolean = false;

  public httpClientMsg: string = "";


  constructor(
    private http : HttpClient
  ) { }

  openSection(sectionName : any){
    this.dashboard = false;
    this.visitors = false;
    this.services = false;
    this.team = false;
    this.career = false;
    this.partner = false;

    switch(sectionName){
      case 'dashboard':
        this.dashboard = true;
        break;
      case 'visitors':
        this.visitors = true;
        break; 
      case 'services':
        this.services = true;
        break; 
      case 'team':
        this.team = true;
        break;
      case 'career':
        this.career = true;
        break;  
      case 'partner':
        this.partner = true;
        break;      
    }
  }

  loginDetails(login: any){
    return this.http.post(`${this.baseUrl}/Login/Login`,login);
  }

  getAdminDetails(){
    return this.http.get(`${this.baseUrl}/Login`);
  }

  getVisitorsDetails(){
    return this.http.get(`${this.baseUrl}/Visitors`);
  }

  //service
  addServices(service : addServices){
    return this.http.post(`${this.baseUrl}/Service`,service);
  }
  getServices(){
    return this.http.get(`${this.baseUrl}/Service`);
  }
  editServices(service: editServices){
    return this.http.put(`${this.baseUrl}/Service/${service.id}`,service);
  }
  deleteService(id: number){
    return this.http.delete(`${this.baseUrl}/Service/${id}`);
  }

  //team
  addTeam(team: addTeam){
    return this.http.post(`${this.baseUrl}/Team`,team);
  }
  getTeam(){
    return this.http.get(`${this.baseUrl}/Team`);
  }
  updateTeam(team: editTeam){
    return this.http.put(`${this.baseUrl}/Team/${team.id}`,team);
  }
  deleteTeam(id: number){
    return this.http.delete(`${this.baseUrl}/Team/${id}`);
  }

  //career
  addCareer(career: addCareer){
    return this.http.post(`${this.baseUrl}/CareerOppertunity`,career);
  }
  getCareer(){
    return this.http.get(`${this.baseUrl}/CareerOppertunity`);
  }
  updateCareer(career: editCareer){
    return this.http.put(`${this.baseUrl}/CareerOppertunity/${career.id}`,career);
  }
  deleteCareer(id: number){
    return this.http.delete(`${this.baseUrl}/CareerOppertunity/${id}`);
  }

  //partner
  addPartner(partner: addPartner){
    return this.http.post(`${this.baseUrl}/Partner`,partner);
  }
  getPartner(){
    return this.http.get(`${this.baseUrl}/Partner`);
  }
  updatePartner(partner: editPartner){
    return this.http.put(`${this.baseUrl}/Partner/${partner.id}`,partner);
  }
  deletePartner(id: number){
    return this.http.delete(`${this.baseUrl}/Partner/${id}`);
  }


}
