import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  customers: any = [];
  limit: number = 10000;
  estado: number = 2;
  start: number = 0;
  rut: string;
  inicio: String ;
  fin: String ;
  anggota: any;
  
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController,
    private storage: Storage,
  ) { }
  
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.customers = [];
    this.start = 0;
    this.loadCustomer();
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.rut = this.anggota.rut;
     
    });
  }

  async proseslogout() {
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toastController.create({
      message: 'Sesion Cerrada',
      duration: 2000
     });
    toast.present();

  }


  addCustomer() {
    this.router.navigate(['/addcustomer']);
  }

  updateCustomer(id, name, desc) {
    this.router.navigate(['/updatecustomer/' + id + '/' + name + '/' + desc]);
  }

  showCustomer(id, name, desc) {
    this.router.navigate(['/showcustomer/' + id + '/' + name + '/' + desc]);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
  
  loadData(event: any) {
    this.estado += this.start += this.limit ;

    setTimeout(() => {
    this.loadCustomer().then(() => {
    event.target.complete();
    });
    }, 500);
   
  }


  delCustomer(id) {
    let body = {
        aksi: 'delete',
        id_analisi : id
      };

    this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        this.ionViewWillEnter();
      });
  }
  filtro() {
  }

  loadCustomer() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getdata',
        estado : this.estado,
        inicio : this.inicio,
        fin : this.fin,
        rut : this.rut,
        limit : this.limit,
        start : this.start,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.customers.push(customer);
        }
        resolve(true);
      });
    });
  }
  

}
