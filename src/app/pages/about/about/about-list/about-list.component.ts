import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';
import { Whyezi } from 'app/shared/models';
import { WhyeziService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-list',
  templateUrl: './about-list.component.html',
  styleUrls: ['./about-list.component.scss']
})
export class AboutListComponent implements OnInit {


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
      key: 'icon',
      label: 'Image',
      visible: true
    },

 
    {
      key: 'choises',
      label: 'Choises',
      visible: true
    }
  ];

  //main-object
  why: Whyezi;
  whyitem: Whyezi[]=[];

  editObj :Whyezi = new Whyezi();
  index : number

  icon: string;
  updateimg: boolean =true;
  toupdate: boolean = false;
  apearButton: boolean = true;
  ResetButton: boolean = false;

  formSubmitted: boolean= false;
  constructor( private whyeziServices: WhyeziService ,
    private swalService: SwalService,
    private route: Router,
    ) { }

  ngOnInit(): void {

    this.why = new Whyezi();
    this.getDataImg();
  }

  getDataImg(){
    this.whyeziServices.getAll().subscribe(res =>{
      this.whyitem = res.data.map(item =>{
        item.icon = 'http://api.ezicodes.com/'+item.icon
        return item
      })
    })
  }

  delete(  index: number) {
    this.editObj = {...this.whyitem[index]}
    this.index = index;
    this.swalService.showRemoveConfirmation(index).then(
      result => {
        if (result.value) {
          this.whyeziServices.delete(this.editObj.id).subscribe(
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


navigateToEdit(id: number) {
  this.route.navigate([`./pages/whyezi/edit/${id}`], { queryParams: { isAdd: false } })
}
navigateToAdd() {
  this.route.navigate([`./pages/whyezi/edit/false`], { queryParams: { isAdd: true } })
}

}
