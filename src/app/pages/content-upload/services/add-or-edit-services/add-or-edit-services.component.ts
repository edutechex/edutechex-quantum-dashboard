import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addServices, editServices } from 'src/app/app.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-or-edit-services',
  templateUrl: './add-or-edit-services.component.html',
  styleUrls: ['./add-or-edit-services.component.css']
})
export class AddOrEditServicesComponent implements OnInit{
  addEditServiceItemForm: any = FormGroup ;
  success: boolean = false;
  err: boolean = false;
  url:any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb: FormBuilder,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<AddOrEditServicesComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditServiceItemForm = this.fb.group({
      imageFile : '',
      title: new FormControl('',[Validators.required]),
      content : new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.addEditServiceItemForm.patchValue(this.datas);
  }
  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditServiceItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditServiceItem(){
    if(this.addEditServiceItemForm.valid){
      if(this.datas){
        const editServicesData : editServices = {
          id: this.datas.id,
          imageFile : this.addEditServiceItemForm.controls['imageFile'].value,
          content : this.addEditServiceItemForm.controls['content'].value,
          title : this.addEditServiceItemForm.controls['title'].value,
        }
        this.editServicesItem(editServicesData);
      }else{
        const addServicesData : addServices = {
          imageFile : this.addEditServiceItemForm.controls['imageFile'].value,
          content : this.addEditServiceItemForm.controls['content'].value,
          title : this.addEditServiceItemForm.controls['title'].value,
        }
        this.addServicesItem(addServicesData);
      }
    }
  }
  addServicesItem(data: any){
    const formData: any  = new FormData();
    formData.append('imageFile',this.file);
    formData.append('content',this.addEditServiceItemForm.get('content').value);
    formData.append('title',this.addEditServiceItemForm.get('title').value);

    this.appService.addServices(formData).subscribe({
      next:(res)=>{
       this.closeModal();
       this.success = true;
       this.err = false;
        this.successMsgDialog('Item Added Successfylly');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  editServicesItem(data: any){
    const formData: any  = new FormData();
    formData.append('id',data.id);
    formData.append('imageFile',this.file);
    formData.append('content',this.addEditServiceItemForm.get('content').value);
    formData.append('title',this.addEditServiceItemForm.get('title').value);

    this.appService.editServices(formData).subscribe({
      next:(res)=>{
       this.closeModal();
       this.success = true;
       this.err = false;
        this.successMsgDialog('Item Updated Successfylly');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 750;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
        // this.appService.openSection('navItem');
      }, timeout);
    });
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
