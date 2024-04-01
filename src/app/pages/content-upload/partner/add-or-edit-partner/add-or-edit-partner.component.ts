import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addPartner, editPartner } from 'src/app/app.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-or-edit-partner',
  templateUrl: './add-or-edit-partner.component.html',
  styleUrls: ['./add-or-edit-partner.component.css']
})
export class AddOrEditPartnerComponent implements OnInit{
  addEditPartnerItemForm: any = FormGroup;
  success: boolean = false;
  err: boolean = false;
  url:any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;


  constructor(
    public appService : AppService,
    public fb: FormBuilder,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<AddOrEditPartnerComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditPartnerItemForm = this.fb.group({
      imageFile : '',
      name: '',
      type : new FormControl('',[Validators.required]),
    })
  }
  ngOnInit(): void {
    this.addEditPartnerItemForm.patchValue(this.datas);
  }
  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditPartnerItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditPartnerItem(){
    if(this.addEditPartnerItemForm.valid){
      if(this.datas){
        const editPartnerData : editPartner = {
          id: this.datas.id,
          imageFile : this.addEditPartnerItemForm.controls['imageFile'].value,
          name : this.addEditPartnerItemForm.controls['name'].value,
          type : this.addEditPartnerItemForm.controls['type'].value,
        }
        this.editPartnerItem(editPartnerData);
      }else{
        const addPartnerData : addPartner = {
          imageFile : this.addEditPartnerItemForm.controls['imageFile'].value,
          name : this.addEditPartnerItemForm.controls['name'].value,
          type : this.addEditPartnerItemForm.controls['type'].value,
        }
        this.addPartnerItem(addPartnerData);
      }
    }
  }
  addPartnerItem(data: any){
    const formData: any  = new FormData();
    formData.append('imageFile',this.file);
    formData.append('name',this.addEditPartnerItemForm.get('name').value);
    formData.append('type',this.addEditPartnerItemForm.get('type').value);

    this.appService.addPartner(formData).subscribe({
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
  editPartnerItem(data: any){
    const formData: any  = new FormData();
    formData.append('id',data.id);
    formData.append('imageFile',this.file);
    formData.append('name',this.addEditPartnerItemForm.get('name').value);
    formData.append('type',this.addEditPartnerItemForm.get('type').value);

    this.appService.updatePartner(formData).subscribe({
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
