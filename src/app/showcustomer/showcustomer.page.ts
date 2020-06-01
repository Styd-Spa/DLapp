import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showcustomer',
  templateUrl: './showcustomer.page.html',
  styleUrls: ['./showcustomer.page.scss'],
})
export class ShowcustomerPage implements OnInit {
  nom_prueba: string;
  nom_metodo: string;
  cod_analisi: String;

    constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private actRoute: ActivatedRoute
  ) { }

   ngOnInit() {
    this.actRoute.params.subscribe((data: any) =>{
    this.cod_analisi = data.id;
    this.nom_prueba = data.name;
    this.nom_metodo = data.desc;
    console.log(data);

    });
  }

}
