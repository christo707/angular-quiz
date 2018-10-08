import { Injectable } from '@angular/core';
import { HttpClient,Headers, RequestOptions  } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
      return participant.Name;
    }

    submitScore(name: string, email: string, score: number, time: number) {
      console.log("Posting Participant: ");
      var headers = new Headers();
      headers.append('Content-Type', 'application/json' );
      const requestOptions = new RequestOptions({ headers: headers });
      var body = {
        name: name,
        email: email,
        score: score,
        time: number
      }
      return this.http.post(this.rootUrl + '/participant', JSON.stringify(body), requestOptions).pipe(
        map(res => res.json()));
    }

    getQuestions() {
      return this.http.get(this.rootUrl + '/questions').pipe(
        map(res => res.json()));
    }

}
