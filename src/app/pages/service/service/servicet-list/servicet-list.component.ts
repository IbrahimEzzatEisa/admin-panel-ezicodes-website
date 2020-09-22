import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Config } from 'protractor';
import { ServicesItem } from 'app/shared/models';
import { ServicesService, ConfigurationService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Router } from '@angular/router';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-servicet-list',
  templateUrl: './servicet-list.component.html',
  styleUrls: ['./servicet-list.component.scss']
})
export class ServicetListComponent implements OnInit {

  description: string;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  // tabel config 
  configs: Config[] = [
    {
      key: 'id',
      label: ' ID',
      visible: true
    },
    {
      key: 'order',
      label: ' Order',
      visible: true
    },
    {
      key: 'title',
      label: 'Titels',
      visible: true
    },
    {
      key: 'titleAr',
      label: 'Titels',
      visible: true
    },
    {
      key: 'image',
      label: ' Images',
      visible: true
    },
    
    {
      key: 'choises',
      label: 'Choises',
      visible: true
    }
  ];
//mainobject
  servicesData: ServicesItem;

  sliders : ServicesItem[] = [];
  isEdit : boolean = false;
  index : number
  editObj :ServicesItem = new ServicesItem();

  image: string;
  updateimg: boolean =true;
  toupdate: boolean = false;
  apearButton: boolean = true;
  ResetButton: boolean = false;

  formSubmitted: boolean= false;
 language = "ar"
constructor(    
    private servicesServices: ServicesService ,
    private swalService: SwalService,
    private route: Router,
    private conServices: ConfigurationService

    ) { }
    ngOnInit() {
      this.servicesData= new ServicesItem(); 
      this.getDataImg();
      this.getDataImgBylang();
      this.getDataImgBylangs();
  
    }

    getDataImg(){
      this.servicesServices.getAll().subscribe(res =>{
        this.sliders = res.data.map(item =>{
          item.image = 'http://api.ezicodes.com/'+item.image
          return item
        })
      })
    }
    onFileChanged(event: HTMLInputEvent) {
      const file = event.target.files[0];
      let el = event.target.parentNode as HTMLElement;
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
       this.servicesData.image = reader.result as string;
       this.servicesData.image = this.servicesData.image.split(',')[1];
  
      }
    }
    onFileChangedEdit(event: HTMLInputEvent) {
      const file = event.target.files[0];
      let el = event.target.parentNode as HTMLElement;
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
       this.editObj.image = reader.result as string;
       this.sliders[this.index].image = this.editObj.image;
       this.editObj.image = this.editObj.image.split(',')[1];
      }
    }
    reset(){
      this.servicesData = new ServicesItem();
      // this.servicesData.id = ;
      this.servicesData.order = null;
      this.servicesData.description = null;
      this.servicesData.intro = null;
      this.servicesData.title= null;
      this.servicesData.image = null;
      this.updateimg = false;
      this.toupdate = false;
      this.apearButton = false;
      this.ResetButton = false;
    }
    save(){
     this.servicesServices.create(this.servicesData).subscribe(res =>{
      this.swalService.Notifier(' success ');
      this.getDataImg();
      this.reset();
    }, err => {
      let errorMessage = err.data || ' Error    ';
      this.swalService.NotifierError(errorMessage)
     },)
    }
 
  
   
 
    delete(  index: number) {
      this.editObj = {...this.sliders[index]}
      this.index = index;
      this.swalService.showRemoveConfirmation(index).then(
        result => {
          if (result.value) {
            this.servicesServices.delete(this.editObj.id).subscribe(
              res => {
                this.swalService.Notifier('Done ');
                this.getDataImg();
  
              },
              err => {
                let errorMessage = err.message || ' Error  ';
                this.swalService.NotifierError(errorMessage)
              }
            )
          }
        }
      );
    }

    //fill
    fill(item: ServicesItem) {
      this.servicesData.id = item.id
      this.servicesData.title = item.title;
      this.servicesData.order = item.order;
       this.servicesData.intro = item.intro;
      this.image = item.image;
      this.servicesData.image = this.image.split(',')[1];
      this.description = item.description.split('<font face="Arial" >')[1];;
        this.servicesData.description  = item.description;
  
    }
    

    saveupdate(){
      this.update();
    }
    update( ) {
      this.servicesServices.update(this.servicesData.id, this.servicesData).subscribe(
        res => {
          this.swalService.Notifier('Done ');
          this.getDataImg();
          this.reset();

        },
        err => {
          const errorMessage = err.message || ' UPDATING  ERROR   ';
          this.swalService.NotifierError(errorMessage)
  
        }
      )
    }
    OpenToImg(){
      this.updateimg = false;
      this.toupdate = true;
      this.apearButton = false;
      this.ResetButton = true;
  
    }
    restimg(){
      this.updateimg = true;
      this.toupdate = false;
      this.ResetButton = false;
      this.apearButton = true;
    }
  cancel(){
    this.reset();
  }
  Add(){
    this.reset();
  }


    getDataImgBylang(){
    this.servicesServices.getAllByLang(this.language).subscribe(res =>{
      console.log(this.language)
      // this.sliders = res.data.map(item =>{
      //   item.image = 'http://api.ezicodes.com/'+item.image
      //   return item
      // })
    })
  }

  getDataImgBylangs(){
    this.conServices.getAllByLang(this.language).subscribe(res =>{
      console.log(this.language)
      // this.sliders = res.data.map(item =>{
      //   item.image = 'http://api.ezicodes.com/'+item.image
      //   return item
      // })
    })
  }


  navigateToEdit(id: number) {
    this.route.navigate([`./pages/service/edit/${id}`], { queryParams: { isAdd: false } })
  }
  navigateToAdd() {
    this.route.navigate([`./pages/service/edit/false`], { queryParams: { isAdd: true } })
  }
  }  