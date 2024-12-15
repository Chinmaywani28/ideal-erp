import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _snackBar: MatSnackBar) { }

  questions: any = [

    {id: 1, questionText: 'What is capital of India'},
    {id: 2, questionText: 'What is capital of America'},
    {id: 3, questionText: 'What is capital of China'},
    {id: 4, questionText: 'What is capital of UK'},
    {id: 5, questionText: 'What is capital of Turkey'},
    {id: 6, questionText: 'What is capital of Iran'},
    {id: 7, questionText: 'What is capital of Germany'}

  ]

  answer: any = [
    "This is first answer"
  ]
  private currentQuestionIndex: number = 0;
  currentQuestion$ : BehaviorSubject<any> = new BehaviorSubject<any>(this.questions[this.currentQuestionIndex])
  private timerSubscription: Subscription | null = null
  


  getCurrentQuestion(){
    return this.questions[this.currentQuestionIndex]
  }

  goToNextQuestion(){
    if(this.currentQuestionIndex < this.questions.length - 1){
      this.currentQuestionIndex++
      this.currentQuestion$.next(this.getCurrentQuestion())
      this.resetTimer()
    }else{
      this.stopTimer()
    }
  }

  getToPreviousQuestion(){
    if(this.currentQuestionIndex > 0){
      this.currentQuestionIndex--;
      this.currentQuestion$.next(this.getCurrentQuestion())
    } 
  }

  submitAnswer(ans: string){
    this.answer.push(ans)
    console.log("ansfns", this.answer)
  }

  resetTimer(){
      if(this.timerSubscription){
        this.timerSubscription.unsubscribe()
      }
      this.timerSubscription = timer(5000).subscribe(() =>{
        if(this.currentQuestionIndex < this.questions.length - 1){

          this.goToNextQuestion()

        }else{
          console.log("your exam is over!!!!")
        }
          
      }
      )
  }

  stopTimer(){
    if(this.timerSubscription){
      this.timerSubscription.unsubscribe()
    }
  }

}
