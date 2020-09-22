import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Slider } from 'app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'app/shared/services';
import { SlideservicesService } from 'app/shared/services/api';



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-home-add-edit',
  templateUrl: './home-add-edit.component.html',
  styleUrls: ['./home-add-edit.component.scss']
})
export class HomeAddEditComponent implements OnInit {


  @ViewChild('SlideImg', { static: false }) SlideImg: ElementRef;

 //main object
 slid :Slider;
 sliders : Slider[] = [];

 isAdd: boolean;
 formSubmitted: boolean = false;

 isBusy: boolean = false;

 index : number
 editObj :Slider = new Slider();

 image: string;

 //chang image flag
 isChangeImage : boolean = false;

 isEdit : boolean = false;
 

 updateimg: boolean =true;
 toupdate: boolean = false;
 apearButton: boolean = true;
 ResetButton: boolean = false;
 
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
  constructor( private route: ActivatedRoute,
    private renderer2: Renderer2,
    private swalService: SwalService,
    private slideServices: SlideservicesService ,
    private router: Router,
    ) { }

    ngOnInit(): void {

      this.slid = new Slider();
    if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'Add') {
      this.isAdd = true;

    } else {
      this.slid.id = this.route.snapshot.params.id;
      this.getSlide(this.slid.id)
      this.isAdd = false
    }
  }

  getSlide(id) {
    this.slideServices.get(id).subscribe(res => {
       this.slid = res;
       this.slid.image = 'http://api.ezicodes.com/'+res.image;
      this.changebackground( this.SlideImg , 'UserImageURL')


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
      this.slideServices.create(this.slid).subscribe(res => {
        this.isBusy = false
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        this.router.navigate([`./pages/home/list`])

      }, err => {
        this.isBusy = false
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
    } else {
      this.isBusy = true
      this.isChangeImage?this.slid.image = this.slid.image:this.slid.image = null;
      this.slideServices.update(this.slid.id , this.slid).subscribe(res => {
        this.isBusy = false;
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        this.router.navigate([`./pages/home/list`])

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
     this.slid.image = reader.result as string;
     this.slid.image = this.slid.image.split(',')[1];
     
     this.renderer2.setStyle(el,
      'background-image', `url(${reader.result ? reader.result : this.slid.image})`)
    this.renderer2.setStyle(el, 'background-size', 'cover')
    this.renderer2.setStyle(el, 'background-position', 'center')
    this.renderer2.setStyle(el, 'border', '3px solid black')

    }
  }
  changebackground(el: ElementRef, prop: string, isclear?: boolean, clsProp?: string) {
    if (isclear) {
      if (prop == 'UserImageURL') {
        this.renderer2.setStyle(el, 'background-image', `url('../../../../../assets/img/user-image.png)`)
        this.slid[clsProp] = "Deleted"
        return
      } 
    }
    if (this.slid[prop] === null) return
    this.renderer2.setStyle(el.nativeElement,
      'background-image', `url('${this.slid.image}')`);
        this.renderer2.setStyle(el.nativeElement, 'background-size', 'cover')
    this.renderer2.setStyle(el.nativeElement, 'background-position', 'center')
    this.renderer2.setStyle(el.nativeElement, 'border', '3px solid black')
    this.renderer2.removeClass(el.nativeElement, 'services-image')
  }
  cancel(){
    this.router.navigate([`./pages/home/list`])
    this.reset();

  }
  reset(){
    this.slid.title="";
    this.slid.titleAr="";
    this.slid.description="";
    this.slid.descriptionAr="";
    this.slid.image="";


 
  }


}
