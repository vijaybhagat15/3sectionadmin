export interface SubMenuItem {
    title: string;
    link: string;
}

export interface HeaderConfig {
    _id?: string;
    name: string;
    navigation: {
        title: string;
        link: string;
        subMenu?: SubMenuItem[];
    }[];
    customHtml?: string;
    logo: {
        url?: string;
        altText: string;
    };
}