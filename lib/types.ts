export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  email_verified_at: string | null;
};

export type Session = {
  user: User | null;
  token: string | null;
};
export type EmployeeDetails = {
  department: string;
  email: string;
  employment_type: string;
  full_name: string;
  id: number;
  job_title: string;
  location: string;
  start_date: string;
  status: string;
};

export type SingleEmployeeDetails = {
  address: string;
  current_salary: number;
  department: string;
  dob: string;
  emp_type: string;
  full_name: string;
  image_url: string;
  job_title: string;
  manager: string;
  next_of_kin: string;
  phone_no_nok: string;
  spouse: string;
  start_date: string;
};
