import { WebsiteType } from "./website";

// Define export interface types for component props
export interface FilterControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    sortOrder: "asc" | "desc";
    toggleSortOrder: () => void;
}

export interface WebsiteListItemProps {
    website: WebsiteType;
    isSelected: boolean;
    onClick: () => void;
}

export interface EmptyWebsiteListProps {
    resetFilters: () => void;
}

export interface PreviewTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export interface WebsiteContentProps {
    website: WebsiteType;
}