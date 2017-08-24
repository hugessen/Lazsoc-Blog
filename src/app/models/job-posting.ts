export class JobPosting {
  club_id:number;
  contact_email:string;
  created_at:string;
  id:number;
  job_posting_questions:any[];
  title:string;
  updated_at:string;

  constructor(){

  }
}

export interface JobQuestionAnswer {
  job_posting_question_id:number;
  answer:string;
}

export interface JobPostingApplication {
  job_posting_id:number;
  job_question_answers_attributes:JobQuestionAnswer[];
}
