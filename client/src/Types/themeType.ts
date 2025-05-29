// Types/school.ts

export interface InitialThemeState {
    allThemes: ThemeType[];
    themeDetails: ThemeType | null;
}

export interface ColorPreviewProps {
    theme: {
        primary_background_Color: string;
        primary_text_Color: string;
        Secondary_background_Color: string;
        accentColor: string;
    };
}

export interface ButtonStyles {
    backgroundColor: string;
    textColor: string;
    borderRadius: string;
    hoverBackgroundColor: string;
}

export interface ThemeType {
    _id?: string;
    name: string;
    primary_background_Color: string;
    primary_text_Color: string;
    Secondary_background_Color: string;
    secondary_text_Color: string;
    accentColor: string;
    fontFamily: string;
    borderColor: string;
    headerBackgroundColor: string;
    footerBackgroundColor: string;
    buttonStyles: ButtonStyles;
    linkColor: string;
    customCSS: string;
    isDefault?: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ThemeModalProps {
    theme: ThemeType;
    setTheme?: React.Dispatch<React.SetStateAction<ThemeType>>;
    onSave: () => void;
    onCancel: () => void;
    title: string;
    isLoading: boolean
}

export interface ColorInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string,
    value: string,
    label: string
}