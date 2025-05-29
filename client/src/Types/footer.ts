export interface FooterLink {
    _id?: string;
    title: string;
    url: string;
}

export interface SocialLink {
    _id?: string;
    platform: string;
    url: string;
}

export interface FooterColumn {
    _id?: string;
    title: string;
    links?: Array<{ text: string; url: string }>;
}

export interface Footer {
    _id?: string;
    name: string;
    copyright: string;
    description: string;
    openingHours: string;
    logo: string;
    Privacy_Policy: string;
    links?: FooterLink[];
    socialLinks?: SocialLink[];
    columns?: FooterColumn[];
}

// Social Platforms Enum
export const SocialPlatforms = [
    "Linkedin",
    "Facebook",
    "Twitter",
    "Instagram",
    "Youtube",
    "Tiktok",
    "Github",
    "Behance",
    "Discord",
    "Telegram",
    "Medium",
    "Wordpress",
];

export interface FooterInitialState {
    allFooter: Footer[];
    footerDetails: Footer | null;
    links: FooterLink;
    socialLinks: SocialLink;
    columns: FooterColumn;
}