export class UpdateObject {
    first_name: string;
    last_name: string;
    program: string;
    student_id: string;
    image: string;
    summary: string;
    is_bean: string;
    profile_header: string;
    school_year: string;
    work_experiences_attributes: WorkExperience[];

    constructor() {
	    this.first_name = "";
	    this.last_name = "";
	    this.program = "";
	    this.student_id = "";
	    this.image = "";
	    this.summary = "";
	    this.is_bean = "";
	    this.profile_header = "";
	    this.school_year = "";
    }
}

export class WorkExperience {
  	id: number;
    is_club: boolean;
    club_id: number;
    title: string;
    summary: string;
    started_date: Date;
    end_date: Date;
    is_current: false;
    company: string;

    constructor() {
	  	this.id = null;
	    this.is_club = true;
	    this.club_id = 2;
	    this.title = "";
	    this.summary = "";
	    this.start_date = new Date();
	    this.end_date = new Date();
	    this.is_current = false;
	    this.company = "";
    }
}