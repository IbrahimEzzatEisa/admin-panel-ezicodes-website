import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Configuration } from 'app/shared/models/configuration.model';
import { ConfigurationService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Config } from 'protractor';
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  @ViewChild('SlideImg', { static: false }) SlideImg: ElementRef;


  // tabel config 
  configs: Config[] = [
  
    {
      key: 'id',
      label: ' ID',
      visible: true
    },
    {
      key: 'name',
      label: ' Name',
      visible: true
    },
    {
      key: 'value',
      label: 'Value',
      visible: true
    },
    {
      key: 'valueAr',
      label: 'Value Arabic',
      visible: true
    },
    {
      key: 'choises',
      label: 'Choises',
      visible: true
    }
  ];
  logo :Configuration = new Configuration();
  logos : Configuration[]=[] ;
  isEdit : boolean = false;
  index : number
  editObj :Configuration = new Configuration();
  formSubmitted: boolean= false;

  value: string;
  data: string;
  profile: string;
//chang image flag
isChangeImage : boolean = false;

imageLogo: string;
  updateimg: boolean =true;
  toupdate: boolean = false;
  apearButton: boolean = true;
  ResetButton: boolean = false;
 hideimg: boolean = true;
  constructor(private configurationServices : ConfigurationService  ,
    private swalService: SwalService,
    private renderer2: Renderer2,


    ) { }

  ngOnInit() {
    this.logo = new Configuration()
   this.getAllData();
   this.imageLogo;
   this.data;
   this.profile;
  }

  getAllData(){
    this.configurationServices.getAll().subscribe(res =>{
      this.logos = res;
       this.logos = res.map(item =>{
         if ( item.name == "Logo"){
         this.value = 'http://api.ezicodes.com/'+item.value;
         this.imageLogo = this.value;
       }  

       else if( item.name == "About Image"){
        this.data = 'http://api.ezicodes.com/'+item.value;
      } 

      else if( item.name == "Profile Image"){
        this.profile = 'http://api.ezicodes.com/'+item.value;
      } 
      
        // this.changebackground( this.SlideImg , 'UserImageURL')

      
       return item        
       
        })

     })
  }


  //upload img
  onFileChanged(event: HTMLInputEvent ) {
    this.isChangeImage = true;
    const file = event.target.files[0];
    let el = event.target.parentNode as HTMLElement;
    this.renderer2.removeClass(el, 'services-image')


    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
     this.logo.value = reader.result as string;
     this.logo.value  = this.logo.value.split(',')[1];
     this.renderer2.setStyle(el,
      'background-image', `url(${reader.result ? reader.result : this.logo.value})`)
    this.renderer2.setStyle(el, 'background-size', 'cover')
    this.renderer2.setStyle(el, 'background-position', 'center')
    this.renderer2.setStyle(el, 'border', '3px solid black')
    }
  }

  reset(){
  this.logo.id = 0 ;
  this.value = '';
  this.data="";
  this.updateimg = false;
 this.toupdate = false;
  this.apearButton = false;
  this.ResetButton = false;
  }

   //fill
  fill(prop: Configuration) {
    if(prop.name == "Logo") { 
      this.hideimg=  false;
      this.logo.name = prop.name;
      this.logo.id = prop.id;
      this.value = 'http://api.ezicodes.com/'+prop.value;

    }
  else  if(prop.name == "About Image") { 
      this.hideimg=  false;
      this.logo.name = prop.name;
      this.logo.id = prop.id;
      this.data = 'http://api.ezicodes.com/'+prop.value;
      

    }

    else  if(prop.name == "Profile Image") { 
      this.hideimg=  false;
      this.logo.name = prop.name;
      this.logo.id = prop.id;
      this.logo.valueAr = prop.valueAr; 
      this.profile = 'http://api.ezicodes.com/'+prop.value;

    }
    
    else {
      this.hideimg = true
      this.logo.id = prop.id
      this.logo.name = prop.name;
      this.logo.value = prop.value;
      this.logo.valueAr = prop.valueAr;
    }


  }

  saveupdate(){
    this.update()
  }
  update( ) { 
    // this.isChangeImage?this.logo.value = this.logo.value:this.logo.value= null;

    this.configurationServices.update(this.logo.id, this.logo).subscribe(
      res => {
        this.swalService.Notifier('Done ');
        this.getAllData();
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

changebackground(el: ElementRef, prop: string, isclear?: boolean, clsProp?: string) {
  if (isclear) {
    if (prop == 'UserImageURL') {
      this.renderer2.setStyle(el, 'background-image', `url('../../../../../assets/img/user-image.png)`)
      this.logo[clsProp] = "Deleted"
      return
    } 
  }
  if (this.logo[prop] === null) return
    this.renderer2.setStyle(el.nativeElement,
      'background-image', `url('${this.logo.value}')`);
         this.renderer2.setStyle(el.nativeElement, 'background-size', 'cover')
      this.renderer2.setStyle(el.nativeElement, 'background-position', 'center')
      this.renderer2.setStyle(el.nativeElement, 'border', '3px solid black')
      this.renderer2.removeClass(el.nativeElement, 'services-image')

  } 

 

}
