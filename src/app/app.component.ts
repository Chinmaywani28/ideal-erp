import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionService } from './services/question.service';
import { Observable, takeWhile } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule , RouterOutlet , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private questionService: QuestionService) {}


  title = 'easyhr';
  question: any 
  currentQuestion$!: Observable<any>
  answer: string = ''
  timer: any


  ngOnInit(): void{
    this.currentQuestion$ = this.questionService.currentQuestion$
    // console.log("observable::",this.currentQuestion$ )
    this.questionService.resetTimer()
  }

  getCurrentQuestion(){
    this.question = this.questionService.getCurrentQuestion()
  }

  next() {

    this.questionService.goToNextQuestion()
  }

  previous(){
    this.questionService.getToPreviousQuestion()
  }

  submit(ans: string){
    this.questionService.submitAnswer(ans)
  }


  




  

  

}
