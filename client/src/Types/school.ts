export interface SchoolProps {
  _id?: string;
  schoolName: string;
  branchName?: string;
  schoolType: string;
  othertype?: string;
  affiliation: string;
  year?: Date | null;
  schoolLogo?: string | File;
  email: string;
  phone: string;
  alternatePhone?: string;
  schoolurl?: string;
  street?: string;
  location: string;
  state: string;
  zipcode: string;
  country?: string;
  principalName: string;
  principalEmail: string;
  principalPhone: string;
  linkedinProfile?: string;
  description: string;
  totalStudents?: number;
  totalFaculty?: number;
  ratio?: number;
}

export type RequiredFieldName = "schoolName" | "schoolType" | "location" | "description" | "affiliation" | "email" | "phone" | "state" | "zipcode" | "principalName" | "principalEmail" | "principalPhone" | "branchName";

export interface SchoolApiResponse {
  school: SchoolProps;
  success: boolean;
  message: string;
}

export interface initialSchoolState {
  schools: SchoolProps[];
  schoolDetails: SchoolProps | null;
}


export interface InputfieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  required?: boolean;
  accept?: string;
}

export type Facility = "Library" | "Sports Complex" | "Science Lab" | "Computer Lab" | "Cafeteria" | "Auditorium" | "Art Studio" | "Sports Field" | "Music Room" | "Swimming Pool";

export type BranchStatus = "active" | "maintenance" | "inactive";

export interface Branch {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  studentsCount: number;
  teachersCount: number;
  established: string; // ISO date format YYYY-MM-DD
  status: BranchStatus;
  facilities: Facility[];
}
