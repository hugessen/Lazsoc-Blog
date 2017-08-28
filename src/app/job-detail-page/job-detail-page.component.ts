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
  private errors = [];
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
      resume_link:"",
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
    this.errors = this.validateSubmission();
    if(this.errors.length == 0)
      this.webAPI.submitJobApplication(this.jobApplication);
    else this.topFunction();
  }

  getYearOptions(){
    return ["1","2","3","4","5+"];
  }

  topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

  validateSubmission(){
    var incorrectFields = [];
    if(this.jobApplication.full_name === "")
      incorrectFields.push("Full name can't be blank");
    if(this.jobApplication.email === "")
      incorrectFields.push("Email can't be blank")
    if(this.jobApplication.program === "")
      incorrectFields.push("Program can't be blank")
    if(this.jobApplication.resume_link === "")
      incorrectFields.push("Resume link can't be blank")

    for(var i = 0; i < this.jobApplication.job_question_answers_attributes.length; i++) {
      if (this.jobApplication.job_question_answers_attributes[i].answer === "")
        incorrectFields.push("Question #"+(i+1)+" must have an answer");
    }
    return incorrectFields;
  }
}
