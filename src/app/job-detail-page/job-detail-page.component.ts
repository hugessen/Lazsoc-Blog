import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebAPI } from '../services/web-api.service';
import { JobPosting, JobQuestionAnswer, JobPostingApplication } from '../models/job-posting';

@Component({
  selector: 'app-job-detail-page',
  templateUrl: './job-detail-page.component.html',
  styleUrls: ['./job-detail-page.component.css']
})
export class JobDetailPageComponent implements OnInit {
  posting:JobPosting = new JobPosting();
  private club = {};
  private jobApplication:JobPostingApplication;

  constructor( private route: ActivatedRoute, private router: Router, private webAPI: WebAPI ) {

  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.webAPI.getJobPosting(+params.get('id')))
      .subscribe((event) => {
          this.webAPI.getClub(+event.club_id).then(res => {
            this.club = res;
            this.posting = event;
            this.initApplication(this.posting.id,this.posting.job_posting_questions);
          })
      });
  }

  initApplication(postingId:number, questions:any[]){
    this.jobApplication = {
      full_name:"",
      email:"",
      program:"",
      year:1,
      job_posting_id:postingId,
      job_question_answers_attributes:[]
    };
    for (var i=0; i<questions.length; i++) {
      this.jobApplication.job_question_answers_attributes[i] = {
        job_posting_question_id:questions[i].id,
        answer:""
      }
    }
  }

  submitJobApp():void {
    console.log(this.jobApplication);
    this.webAPI.submitJobApplication(this.jobApplication);
  }

  getYearOptions(){
    return ["1","2","3","4","5+"];
  }
}
