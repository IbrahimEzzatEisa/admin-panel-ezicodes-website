import { Component, OnInit } from '@angular/core';
import { Slider } from 'app/shared/models';
import { SlideservicesService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Config } from 'protractor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  

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
  //main object
  slid :Slider = new Slider();
  sliders : Slider[] = [];
  isEdit : boolean = false;
  index : number
  editObj :Slider = new Slider();
  formSubmitted: boolean= false;

  image: string;
  updateimg: boolean =true;
  toupdate: boolean = false;
  apearButton: boolean = true;
  ResetButton: boolean = false;

  constructor(private slideservicesService : SlideservicesService  ,
    private swalService: SwalService,
    private route: Router,

    ) { }

  ngOnInit() {
    this.getAllData();
  }

  getAllData(){
    this.slideservicesService.getAll().subscribe(res =>{
      this.sliders = res.data.map(item =>{
        item.image = 'http://api.ezicodes.com/'+item.image
        return item
      })
      
    })

  }
  //upload img
  onFileChanged(event: HTMLInputEvent) {
    const file = event.target.files[0];
    let el = event.target.parentNode as HTMLElement;
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
     this.slid.image = reader.result as string;
     this.slid.image = this.slid.image.split(',')[1];

    }
  }
  //upload edit
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
    this.slid.order = null
    this.slid.description = null ;
    this.slid.image = null;
    this.slid.title= null;
    this.updateimg = false;
    this.toupdate = false;
    this.apearButton = false;
    this.ResetButton = false;

  }
  save(){
   this.slideservicesService.create(this.slid).subscribe(res =>{
    this.swalService.Notifier(' success ');
    this.reset();
    this.getAllData();
    this.reset();
  }, err => {
    let errorMessage = err.data || ' Error    ';
    this.swalService.NotifierError(errorMessage)
   },)
  }


  delete(  index: number ) {
    this.editObj = {...this.sliders[index]}
    this.index = index;
    this.swalService.showRemoveConfirmation(index).then(
      result => {
        if (result.value) {
          this.slideservicesService.delete(this.editObj.id).subscribe(
            res => {
              this.swalService.Notifier('Done ');
              this.getAllData();

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
  fill(item: Slider) {
    this.slid.id = item.id
    this.slid.title = item.title;
    this.slid.order = item.order;
    this.image = item.image;
    this.slid.image = this.image.split(',')[1];

    this.slid.description = item.description

  }

  saveupdate(){
    this.update();
  }

  update( ) {
  
    
    this.slideservicesService.update(this.slid.id, this.slid).subscribe(
      res => {
        this.swalService.Notifier('Done ');
         this.reset();
        this.getAllData();
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

navigateToEdit(id: number) {
  this.route.navigate([`./pages/home/edit/${id}`], { queryParams: { isAdd: false } })
}
navigateToAdd() {
  this.route.navigate([`./pages/home/edit/false`], { queryParams: { isAdd: true } })
}
}  



