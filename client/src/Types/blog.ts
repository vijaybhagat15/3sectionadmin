export interface BlogType {
    _id?: string;
    title: string;
    content: string;
    author: string;
    files: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface InitialBlogState {
    allBlogs: BlogType[];
}

export interface BlogModalProps {
    blog: BlogType;
    setBlog?: React.Dispatch<React.SetStateAction<BlogType>>;
    onSave: () => void;
    onCancel: () => void;
    title: string;
    isLoading: boolean;
}

export interface BlogInputProps {
    name: keyof BlogType;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    label: string;
}

export interface FileUploadProps {
    files: File[];
    onFilesChange: (files: File[]) => void;
}
