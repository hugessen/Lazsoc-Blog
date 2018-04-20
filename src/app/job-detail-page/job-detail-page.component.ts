import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WebAPI } from '../services/web-api.service';
import { JobPosting, JobQuestionAnswer, JobPostingApplication } from '../models/job-posting';
import { Club } from '../models/club';

@Component({
  selector: 'app-job-detail-page',
  templateUrl: './job-detail-page.component.html',
  styleUrls: ['./job-detail-page.component.css']
})
export class JobDetailPageComponent implements OnInit {
  posting: JobPosting = new JobPosting();
  public club: Club = new Club();
  public errors = [];
  public jobApplication: JobPostingApplication = new JobPostingApplication();
  resume: any;
  resumeUploaded = false;
  submitted = false;

  constructor( public route: ActivatedRoute, public router: Router, public webAPI: WebAPI ) {

  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.webAPI.getJobPosting(+params.get('id')))
      .subscribe((posting) => {
          this.webAPI.getClub(+posting.club_id).then(res => {
            this.club = res;
            this.posting = posting;
            this.initApplication(this.posting.id, this.posting.job_posting_questions);
          })
      });
  }

  initApplication(postingId: number, questions: any[]) {
    this.jobApplication = {
      full_name: '',
      email: '',
      program: '',
      year: 1,
      resume_link: '',
      job_posting_id: postingId,
      job_question_answers_attributes: []
    };
    for (let i = 0; i < questions.length; i++) {
      this.jobApplication.job_question_answers_attributes[i] = {
        job_posting_question_id: questions[i].id,
        answer: ''
      }
    }
  }

  submitJobApp(): void {
    if (this.submitted) { return; }
    this.errors = this.validateSubmission();
    if (this.errors.length == 0) {
      this.webAPI.submitJobApplication(this.jobApplication);
      this.submitted = true;
      this.topFunction();
    } else { this.topFunction(); }
  }

  getYearOptions() {
    return ['1', '2', '3', '4', '5+'];
  }

  topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
  }

  fileEvent(event: any) {
    this.resume = event.target.files[0];
  }

  uploadResume() {

  }

  validateSubmission() {
    let incorrectFields = [];
    if (this.jobApplication.full_name === '') {
      incorrectFields.push('Full name can\'t be blank');
    }
    if (this.jobApplication.email === '') {
      incorrectFields.push('Email can\'t be blank')
    }
    if (this.jobApplication.program === '') {
      incorrectFields.push('Program can\'t be blank')
    }
    if (this.jobApplication.resume_link === '') {
      incorrectFields.push('Resume link can\'t be blank')
    }

    for (let i = 0; i < this.jobApplication.job_question_answers_attributes.length; i++) {
      if (this.jobApplication.job_question_answers_attributes[i].answer === '') {
        incorrectFields.push('Question #' + (i + 1) + ' must have an answer');
      }
    }
    return incorrectFields;
  }
}
