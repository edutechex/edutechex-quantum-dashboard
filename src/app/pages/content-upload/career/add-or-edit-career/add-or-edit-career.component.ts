import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { addCareer, editCareer } from 'src/app/app.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-or-edit-career',
  templateUrl: './add-or-edit-career.component.html',
  styleUrls: ['./add-or-edit-career.component.css']
})
export class AddOrEditCareerComponent implements OnInit{
  addEditcareerItemForm: any = FormGroup;
  success: boolean = false;
  err: boolean = false;
  url:any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
   
  };

  constructor(
    public appService : AppService,
    public fb: FormBuilder,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<AddOrEditCareerComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditcareerItemForm = this.fb.group({
      imageFile : '',
      title: new FormControl('',[Validators.required]),
      about : '',
    })
  }

  ngOnInit(): void {
    this.addEditcareerItemForm.patchValue(this.datas);
  }
  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditcareerItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditCareerItem(){
    if(this.addEditcareerItemForm.valid){
      if(this.datas){
        const editCarrerData : editCareer = {
          id: this.datas.id,
          imageFile : this.addEditcareerItemForm.controls['imageFile'].value,
          title : this.addEditcareerItemForm.controls['title'].value,
          about : this.addEditcareerItemForm.controls['about'].value,
        }
        this.editCareerItem(editCarrerData);
      }else{
        const addCarrerData : addCareer = {
          imageFile : this.addEditcareerItemForm.controls['imageFile'].value,
          title : this.addEditcareerItemForm.controls['title'].value,
          about : this.addEditcareerItemForm.controls['about'].value,
        }
        this.addCareerItem(addCarrerData);
      }
    }
  }

  addCareerItem(data: any){
    const formData: any  = new FormData();
    formData.append('imageFile',this.file);
    formData.append('title',this.addEditcareerItemForm.get('title').value);
    formData.append('about',this.addEditcareerItemForm.get('about').value);

    this.appService.addCareer(formData).subscribe({
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

  editCareerItem(data: any){
    const formData: any  = new FormData();
    formData.append('id',data.id);
    formData.append('imageFile',this.file);
    formData.append('title',this.addEditcareerItemForm.get('title').value);
    formData.append('about',this.addEditcareerItemForm.get('about').value);

    this.appService.addCareer(formData).subscribe({
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
