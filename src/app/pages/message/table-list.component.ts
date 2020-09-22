import { Component, OnInit } from '@angular/core';
import { MessageContact } from 'app/shared/models';
import { Config } from 'protractor';
import { SwalService } from 'app/shared/services';
import { MessageService } from 'app/shared/services/api';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {


  message: MessageContact[]=[];
  messageitem = new MessageContact();


  configs: Config[] = [
  
    {
      key: 'firstName',
      label: 'First Name',
      visible: true
    },
    {
      key: 'lastName',
      label: 'Last Name',
      visible: true
    },
    {
      key: 'email',
      label: ' Email',
      visible: true
    },
    {
      key: 'description',
      label: ' Descriptions',
      visible: true
    },
    {
      key: 'choises',
      label: 'Choises',
      visible: true
    }
  ];
  constructor(     private swalService: SwalService,
    private messageServices: MessageService
    ) { }

  ngOnInit() {
    this.messageitem = new MessageContact();
    this.getDataTabel();

  }

  //get All data 
  getDataTabel(){
    this.messageServices.getAll().subscribe(res=>{
     this.message = res.data;
     console.log(this.message)

    })
  }


  delete(id: number, Name: string, index: number) {
    this.swalService.showRemoveConfirmation(Name).then(
      result => {
        if (result.value) {
          this.messageServices.delete(id).subscribe(
            res => {
              this.message.splice(index, 1);
              this.swalService.Notifier('Done ');
              this.getDataTabel();

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

}
