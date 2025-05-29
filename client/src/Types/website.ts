import { moduleType } from "../pages/WebsiteManagement/WebsiteManager";

export type ModuleDataSettingType = {
    enabled: boolean;
    data: {
        title?: string;
        subtitle?: string;
        bannerType?: string;
        content?: string;
        layoutStyle?: string;
        itemsPerPage?: number;
        displayStyle?: string;
        maxImages?: number;
        submitText?: string;
        enableRecaptcha?: boolean;
        [key: string]: any; // Allows additional module-specific fields
    };
};

export interface initialWebsiteState {
    allWebsite: WebsiteType[];
}

export interface FormSectionProps {
    title: string;
    children: React.ReactNode;
}
export interface CheckboxProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string
}

export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
}

export interface MetaData {
    title: string;
    description: string;
    keywords: string | string[];
}

export interface SslCertificate {
    isActive: boolean;
    expiryDate?: Date | null;
}

export interface WebsiteType {
    _id?: string;
    name: string;
    domainName: string;
    schoolId: string;
    themeId: string;
    footerId: string;
    headerId: string;
    status: string;
    logo?: string;
    contactInfo: ContactInfo;
    modules: Record<moduleType, ModuleDataSettingType>; // Make modules non-optional
    metaData: MetaData;
    createdBy?: string;
    lastPublished?: Date | null;
    sslCertificate?: SslCertificate;
    createdAt?: Date;
    updatedAt?: Date;
    [key: string]: any;
}