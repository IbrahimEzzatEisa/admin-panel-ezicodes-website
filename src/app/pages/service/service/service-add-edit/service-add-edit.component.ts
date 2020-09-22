import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ServicesItem } from 'app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'app/shared/services';
import { ServicesService } from 'app/shared/services/api';
import { AngularEditorConfig } from '@kolkov/angular-editor';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-service-add-edit',
  templateUrl: './service-add-edit.component.html',
  styleUrls: ['./service-add-edit.component.scss']
})
export class ServiceAddEditComponent implements OnInit {

  @ViewChild('ServiceImg', { static: false }) ServiceImg: ElementRef;

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

  //main object
  servicesData: ServicesItem;

  isAdd: boolean;
  formSubmitted: boolean = false;

  isBusy: boolean = false;

  index : number
  editObj :ServicesItem = new ServicesItem();

  sliders : ServicesItem[] = [];
  image: string;

  //chang image flag
  isChangeImage : boolean = false;

  constructor( private route: ActivatedRoute,
    private renderer2: Renderer2,
    private swalService: SwalService,
    private servicesServices: ServicesService , 
    private router: Router
    
    )  { }

  ngOnInit(): void {

      this.servicesData = new ServicesItem();
    if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'Add') {
      this.isAdd = true;

    } else {
      this.servicesData.id = this.route.snapshot.params.id;
      this.getService(this.servicesData.id)
      this.isAdd = false
    }
  }


  getService(id) {
    this.servicesServices.get(id).subscribe(res => {
       this.servicesData = res;
       this.servicesData.image = 'http://api.ezicodes.com/'+res.image;
      this.changebackground( this.ServiceImg , 'UserImageURL')


    })
  }

  save(...args: boolean[]) {
    this.formSubmitted = true;
    let a;
    args.map(item => {
      if (item === true) {
        a = true
        this.swalService.NotifierError('قم بادخال الحقول المطلوبه');
      }
    })
    if (a) return

    if (this.isAdd) {
      this.isBusy = true
      this.servicesServices.create(this.servicesData).subscribe(res => {
        this.isBusy = false
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        this.router.navigate([`./pages/service/list`])

      }, err => {
        this.isBusy = false
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
    } else {
      this.isBusy = true
      this.isChangeImage?this.servicesData.image = this.servicesData.image:this.servicesData.image = null;
      this.servicesServices.update(this.servicesData.id , this.servicesData).subscribe(res => {
        this.isBusy = false;
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        this.router.navigate([`./pages/service/list`])

      }, err => {
        this.isBusy = false;
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })

    }
  }

  onFileChanged(event: HTMLInputEvent ,  prop: string) {
    this.isChangeImage = true;
    const file = event.target.files[0];
    let el = event.target.parentNode as HTMLElement;
    this.renderer2.removeClass(el, 'services-image')
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
     this.servicesData.image = reader.result as string;
     this.servicesData.image = this.servicesData.image.split(',')[1];
     
     this.renderer2.setStyle(el,
      'background-image', `url(${reader.result ? reader.result : this.servicesData.image})`)
    this.renderer2.setStyle(el, 'background-size', 'cover')
    this.renderer2.setStyle(el, 'background-position', 'center')
    this.renderer2.setStyle(el, 'border', '3px solid black')

    }
  }



  changebackground(el: ElementRef, prop: string, isclear?: boolean, clsProp?: string) {
    if (isclear) {
      if (prop == 'UserImageURL') {
        this.renderer2.setStyle(el, 'background-image', `url('../../../../../assets/img/user-image.png)`)
        this.servicesData[clsProp] = "Deleted"
        return
      } 
    }
    if (this.servicesData[prop] === null) return
    this.renderer2.setStyle(el.nativeElement,
      'background-image', `url('${this.servicesData.image}')`);
        this.renderer2.setStyle(el.nativeElement, 'background-size', 'cover')
    this.renderer2.setStyle(el.nativeElement, 'background-position', 'center')
    this.renderer2.setStyle(el.nativeElement, 'border', '3px solid black')
    this.renderer2.removeClass(el.nativeElement, 'services-image')
  }
  cancel(){
    this.router.navigate([`./pages/service/list`])
    this.reset();

  }
  reset(){
    this.servicesData.title="";
    this.servicesData.titleAr="";
    this.servicesData.intro="";
    this.servicesData.introAr="";
    this.servicesData.description="";
    this.servicesData.descriptionAr="";
    this.servicesData.image="";

  }
}
