export interface SchoolBranch {
    _id: string;
    branchName: string;
    branchCode: string;
    email: string;
    website: string;
    branchHeadId: string | undefined;
    status: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    establishedDate: string;
    studentsCount?: number;
    teachersCount?: number;
};

export type NewBranch = Omit<SchoolBranch, '_id'>;

export interface initialStateSchoolBranch {
    allSchoolBranches: SchoolBranch[];
    schoolBranchDetails: SchoolBranch | null;
}