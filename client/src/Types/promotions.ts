
export interface PromotionType {
    _id?: string;
    title: string;
    bannerImage: File | string | null;
    status: 'active' | 'inactive';
    validFrom: string;
    validTo: string;
    schoolId: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface GroupedSchool {
    schoolName: string;
    promotions: PromotionType[];
}

export interface GroupedPromotions {
    [key: string]: GroupedSchool;
}

export interface FilterState {
    school: string;
    status: string;
    dateRange: 'all' | 'week' | 'month' | 'year';
}

export interface ReportData {
    _id: {
        schoolId: string;
        isActive: boolean;
    };
    totalPromotions: number;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    reports: ReportData[];
}

export interface FormattedReport {
    schoolId: string;
    status: string;
    totalPromotions: number;
}

export interface initialPromotionsState {
    allPromotions: PromotionType[];
    promotionDetails: PromotionType | null;
    promotionHistory: PromotionType[],
    promotionReports: FormattedReport[]
}