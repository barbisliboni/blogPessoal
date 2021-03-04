import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema() //instanciando o objeto tema
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService //importar o TemaService
  ) { }

  ngOnInit(){

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    if(environment.tipoUsuario != 'adm'){
      alert('You need to be an adm to access this route')
      this.router.navigate(['/inicio'])
    }

    //LISTANDO TODOS OS TEMAS AUTOMATICAMENTE ASSIM QUE A PAGINA CARREGAR
    this.findAllTemas()
  }

  //acessar o temaService, pegar o metodo getAllTema, transformar em json e retornar um array de temas
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp//this.listaTemas recebe resp
    })
  }

  cadastrar(){ //método chamado no html ao clicar no botão de cadastrar/post
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Your theme was posted successfully!')
      this.findAllTemas()//chamar o findAllTema para cadastrar e listar novamente os temas, nao apenas um 

      //esse service de tema recebera o metodo postTema(desse tema) e sera convertido de json para typescript
      //pelo subscribe, onde resp recebe Tema, seguido pela arrow function

      //ZERANDO O CAMPO DE TEMA PARA SER POSSÍVEL CADASTRAR OUTRO
      this.tema = new Tema()
    })
  } 
}
