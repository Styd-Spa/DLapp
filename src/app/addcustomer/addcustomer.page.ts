import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.page.html',
  styleUrls: ['./addcustomer.page.scss'],
})
export class AddcustomerPage implements OnInit {

  codigo: string ;
  addcustomers: any = [];


  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,

  ) { }

  ngOnInit() {

  }

  async buscar() {
    return new Promise(resolve => {
      let body = {
        aksi: 'buscar',
        codigo : this.codigo,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let addcustomer of data.result) {
          this.addcustomers.push(addcustomer);
        }
        resolve(true);
      });
    });
    

  }



    
  
}
