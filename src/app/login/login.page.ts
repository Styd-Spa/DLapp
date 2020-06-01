import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 rut: string = '';
 pass: string = '';
 id_laboratorio: string = '';
  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    ) { }

  ngOnInit() {

  }



  async proseslogin() {
    if (this.rut != '' && this.pass != '') {
      let body = {
        rut: this.rut,
        pass: this.pass,
        aksi: 'login'
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe(async data => {
       var alertpesan = data.msg;
       if (data.success) {
         this.storage.set('session_storage', data.result);
         this.router.navigate(['/customer']);
         const toast = await this.toastController.create({
          message: 'Bienvenido!',
          duration: 2000
         });
         toast.present();
       } else {
         const toast = await this.toastController.create({
           message: alertpesan,
           duration: 2000
         });
         toast.present();
       }
     });

    } else {
      const toast = await this.toastController.create({
        message: 'Usuario o Contraseña Invalido',
        duration: 2000
      });
      toast.present();
    }

    this.rut = '';
    this.pass = '';
    this.id_laboratorio = '';
    }
  }
