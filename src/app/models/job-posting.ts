export class JobPosting {
  club_id:number;
  contact_email:string;
  created_at:string;
  description:string;
  id:number;
  job_posting_questions:any[];
  job_posting_descriptions:any[];
  title:string;
  updated_at:string;
  expiry_date:any;

  constructor(){

  }
}

export interface JobQuestionAnswer {
  job_posting_question_id:number;
  answer:string;
}

export class JobPostingApplication {
  full_name:string;
  email:string;
  program:string;
  year:number;
  resume_link:string;
  job_posting_id:number;
  job_question_answers_attributes:JobQuestionAnswer[];

  constructor(){}
}
