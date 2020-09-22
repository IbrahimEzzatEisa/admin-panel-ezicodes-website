import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Whyezi } from 'app/shared/models';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'app/shared/services';
import { WhyeziService } from 'app/shared/services/api';



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-about-add-edit',
  templateUrl: './about-add-edit.component.html',
  styleUrls: ['./about-add-edit.component.scss']
})
export class AboutAddEditComponent implements OnInit {

  @ViewChild('SlideImg', { static: false }) SlideImg: ElementRef;

    //main-object
    why: Whyezi;
    whyitem: Whyezi[]=[];

    isAdd: boolean;
    formSubmitted: boolean = false;
   
    isBusy: boolean = false;
   
    index : number
    editObj :Whyezi = new Whyezi();
   
    image: string;
   
    //chang image flag
    isChangeImage : boolean = false;
   
    isEdit : boolean = false;
  
  
    icon: string;

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
  constructor(
    private route: ActivatedRoute,
    private renderer2: Renderer2,
    private swalService: SwalService,
    private WhyEziServices: WhyeziService ,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.why = new Whyezi();
    if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'Add') {
      this.isAdd = true;

    } else {
      this.why.id = this.route.snapshot.params.id;
      this.getSlide(this.why.id)
      this.isAdd = false
    }
  }
  getSlide(id) {
    this.WhyEziServices.get(id).subscribe(res => {
       this.why = res;
       this.why.icon = 'http://api.ezicodes.com/'+res.icon;
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
      this.WhyEziServices.create(this.why).subscribe(res => {
        this.isBusy = false
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        this.router.navigate([`./pages/whyezi/list`])

      }, err => {
        this.isBusy = false
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
    } else {
      this.isBusy = true
      this.isChangeImage?this.why.icon = this.why.icon:this.why.icon = null;
      this.WhyEziServices.update(this.why.id , this.why).subscribe(res => {
        this.isBusy = false;
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        this.router.navigate([`./pages/whyezi/list`])

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
     this.why.icon = reader.result as string;
     this.why.icon = this.why.icon.split(',')[1];
     
     this.renderer2.setStyle(el,
      'background-image', `url(${reader.result ? reader.result : this.why.icon})`)
    this.renderer2.setStyle(el, 'background-size', 'cover')
    this.renderer2.setStyle(el, 'background-position', 'center')
    this.renderer2.setStyle(el, 'border', '3px solid black')

    }
  }
  changebackground(el: ElementRef, prop: string, isclear?: boolean, clsProp?: string) {
    if (isclear) {
      if (prop == 'UserImageURL') {
        this.renderer2.setStyle(el, 'background-image', `url('../../../../../assets/img/user-image.png)`)
        this.why[clsProp] = "Deleted"
        return
      } 
    }
    if (this.why[prop] === null) return
    this.renderer2.setStyle(el.nativeElement,
      'background-image', `url('${this.why.icon}')`);
        this.renderer2.setStyle(el.nativeElement, 'background-size', 'cover')
    this.renderer2.setStyle(el.nativeElement, 'background-position', 'center')
    this.renderer2.setStyle(el.nativeElement, 'border', '3px solid black')
    this.renderer2.removeClass(el.nativeElement, 'services-image')
  }
  cancel(){
    this.router.navigate([`./pages/whyezi/list`])
    this.reset();

  }
  reset(){
    this.why.title="";
    this.why.titleAr="";
    this.why.icon="";



 
  }
}
