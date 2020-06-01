import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.page.html',
  styleUrls: ['./updatecustomer.page.scss'],
})
export class UpdatecustomerPage implements OnInit {
 
  id_analisis: String;
  cod_analisi: String;
    constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private actRoute: ActivatedRoute
  ) { }

   ngOnInit() {

  }


}
