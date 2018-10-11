import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../user';
import { Question } from '../question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  readonly rootUrl = 'http://localhost:3000';
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;

  constructor(private http: HttpClient) { }

  displayTimeElapsed() {
      return Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
    }

    getParticipantName() {
      var participant = JSON.parse(localStorage.getItem('participant'));
      return participant.fname + participant.lname;
    }

//name: string, email: string, score: number, time: number

    submitScore(user: User) : any {
      console.log("Posting Participant: ");
      let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      let options = {
        headers: httpHeaders
      };
      var body = {
        name: user.name,
        email: user.email,
        score: user.score,
        time: user.time
      }
      return this.http.post(this.rootUrl + '/participants', JSON.stringify(body), options);
    }

    getQuestions(): Observable<Question[]> {
      return this.http.get<Question[]>(this.rootUrl + '/questions');
    }

    clear() {
      this.qns = [];
      this.seconds = 0;
      this.qnProgress = 0;
      this.correctAnswerCount = 0;
      clearInterval(this.timer);
    }

}
