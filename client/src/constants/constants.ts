import { Branch } from "../Types/school";
import { AuditLog, Permission } from "../Types/superAdmin";

export const activeClassCss = ({ isActive }: { isActive: boolean }) => `flex p-2 mt-[1px] items-center text-md hover:opacity-70 rounded-md ${isActive ? "bg-surface-active text-primary" : "text-secondary"}`

export const schoolTypes = [
  {
    id: 1,
    value: "all",
    type: "All Types"
  },
  {
    id: 2,
    type: "Public School",
    value: "public",
    description: "Government-funded schools that provide free education to students within their district.",
    examples: ["Neighborhood Elementary", "Central High School", "Washington Middle School"],
    features: ["Free tuition", "Follows state curriculum", "Government oversight", "Certified teachers"]
  },
  {
    id: 3,
    type: "Private School",
    value: "private",
    description: "Independently operated schools funded through tuition, donations, and endowments.",
    examples: ["St. Mary's Academy", "Westside Preparatory", "Phillips Exeter Academy"],
    features: ["Tuition-based", "Smaller class sizes", "Specialized curricula", "Religious or secular options"]
  },
  {
    id: 4,
    type: "International School",
    value: "international",
    description: "Publicly funded but independently International schools with more flexibility in curriculum and teaching methods.",
    examples: ["KIPP Academy", "Achievement First", "Success Academy"],
    features: ["No tuition", "Lottery admission", "Performance contracts", "Innovative teaching models"]
  },
  {
    id: 5,
    type: "Boarding School",
    value: "boarding",
    description: "Public schools with specialized courses or curricula designed to attract students from across different school zones.",
    examples: ["Bronx Science", "School of the Arts", "Tech Magnet High"],
    features: ["Specialized focus (STEM, arts, etc.)", "Competitive admission", "Enhanced resources"]
  },
  {
    id: 6,
    type: "Alternative School",
    value: "alternative",
    description: "Schools designed to address the needs of students not typically met in regular school environments.",
    examples: ["Discovery Learning Center", "New Horizons Academy", "Pathways Program"],
    features: ["Flexible schedules", "Personalized learning", "At-risk student support"]
  },
  { id: 7, type: "other", value: "other", description: "other", examples: [], features: [] }

];

export const filteredSchoolTypes = schoolTypes.filter((item) => item.value !== "all")

export const schoolAffiliations = [
  { label: "CBSE", value: "CBSE" },
  { label: "ICSE / ISC", value: "ICSE" },
  { label: "State Board", value: "STATE_BOARD" },
  { label: "IB (International Baccalaureate)", value: "IB" },
  { label: "IGCSE / Cambridge", value: "IGCSE" },
  { label: "NIOS (Open Schooling)", value: "NIOS" },
  { label: "Matriculation", value: "MATRICULATION" },
  { label: "Anglo-Indian Board", value: "ANGLO_INDIAN" },
  { label: "Kendriya Vidyalaya (KV)", value: "KENDRIYA_VIDYALAYA" },
  { label: "Navodaya Vidyalaya", value: "NAVODAYA_VIDYALAYA" }
];


export const permissionsData: Permission[] = [
  { id: 1, name: "View Dashboard", required: true, description: "Access to view analytics dashboard" },
  { id: 2, name: "Manage Users", required: true, description: "Create, edit, and deactivate user accounts" },
  { id: 3, name: "Edit Posts", required: false, description: "Modify content across the platform" },
  { id: 4, name: "Delete Comments", required: false, description: "Remove user comments" },
  { id: 5, name: "System Configuration", required: true, description: "Modify system-wide settings" },
  { id: 6, name: "Access Logs", required: true, description: "View system and user activity logs" },
  { id: 7, name: "Manage Billing", required: true, description: "Access billing and subscription features" },
  { id: 8, name: "API Access", required: true, description: "Use system APIs and generate keys" }
];

export const dummyLogs: AuditLog[] = [
  {
    id: 1,
    adminName: "John Doe",
    action: "Created a new admin",
    timestamp: "2025-03-05T10:15:00Z",
    details: "Created admin account for Sarah Johnson with limited permissions",
    severity: "medium",
    ipAddress: "192.168.1.45"
  },
  {
    id: 2,
    adminName: "Jane Smith",
    action: "Deleted a user",
    timestamp: "2025-03-05T11:00:00Z",
    details: "Removed user account for james.wilson@example.com due to inactivity",
    severity: "high",
    ipAddress: "192.168.1.28"
  },
  {
    id: 3,
    adminName: "Mark Taylor",
    action: "Updated site settings",
    timestamp: "2025-03-05T12:30:00Z",
    details: "Changed email notification settings and updated password policy",
    severity: "low",
    ipAddress: "192.168.1.15"
  },
  {
    id: 4,
    adminName: "Sarah Johnson",
    action: "Reset user password",
    timestamp: "2025-03-06T09:45:00Z",
    details: "Reset password for user robert.brown@example.com upon request",
    severity: "medium",
    ipAddress: "192.168.1.72"
  },
  {
    id: 5,
    adminName: "John Doe",
    action: "Modified user permissions",
    timestamp: "2025-03-06T14:20:00Z",
    details: "Upgraded user emily.jones@example.com to editor role",
    severity: "medium",
    ipAddress: "192.168.1.45"
  },
  {
    id: 6,
    adminName: "Jane Smith",
    action: "System backup",
    timestamp: "2025-03-07T08:30:00Z",
    details: "Initiated full system backup before maintenance",
    severity: "low",
    ipAddress: "192.168.1.28"
  },
  {
    id: 7,
    adminName: "Mark Taylor",
    action: "API key rotation",
    timestamp: "2025-03-07T16:15:00Z",
    details: "Rotated all production API keys as scheduled",
    severity: "high",
    ipAddress: "192.168.1.15"
  }
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: "br1001",
    name: "Westside Campus",
    address: "1234 Oak Avenue, Seattle, WA 98101",
    contactPerson: "Sarah Johnson",
    phoneNumber: "(206) 555-1234",
    email: "westside@eduschool.org",
    studentsCount: 842,
    teachersCount: 56,
    established: "2008-09-15",
    status: "active",
    facilities: ["Library", "Sports Complex", "Science Lab", "Computer Lab", "Cafeteria"]
  },
  {
    id: "br1002",
    name: "Downtown Center",
    address: "567 Pine Street, Seattle, WA 98102",
    contactPerson: "Michael Chen",
    phoneNumber: "(206) 555-5678",
    email: "downtown@eduschool.org",
    studentsCount: 635,
    teachersCount: 42,
    established: "2012-06-20",
    status: "active",
    facilities: ["Library", "Auditorium", "Art Studio", "Computer Lab"]
  },
  {
    id: "br1003",
    name: "Northgate Branch",
    address: "890 Maple Road, Seattle, WA 98125",
    contactPerson: "Jessica Williams",
    phoneNumber: "(206) 555-9012",
    email: "northgate@eduschool.org",
    studentsCount: 518,
    teachersCount: 35,
    established: "2015-08-10",
    status: "active",
    facilities: ["Library", "Sports Field", "Science Lab", "Music Room"]
  },
  {
    id: "br1004",
    name: "Southside Extension",
    address: "321 Cedar Boulevard, Seattle, WA 98118",
    contactPerson: "Daniel Rodriguez",
    phoneNumber: "(206) 555-3456",
    email: "southside@eduschool.org",
    studentsCount: 472,
    teachersCount: 31,
    established: "2017-07-05",
    status: "maintenance",
    facilities: ["Library", "Computer Lab", "Cafeteria"]
  },
  {
    id: "br1005",
    name: "Eastlake Campus",
    address: "789 Birch Drive, Bellevue, WA 98004",
    contactPerson: "Amanda Taylor",
    phoneNumber: "(425) 555-7890",
    email: "eastlake@eduschool.org",
    studentsCount: 756,
    teachersCount: 50,
    established: "2010-08-25",
    status: "active",
    facilities: ["Library", "Sports Complex", "Science Lab", "Computer Lab", "Auditorium", "Swimming Pool"]
  },
  {
    id: "br1006",
    name: "Westlake Annex",
    address: "432 Elm Street, Seattle, WA 98109",
    contactPerson: "Robert Wilson",
    phoneNumber: "(206) 555-2345",
    email: "westlake@eduschool.org",
    studentsCount: 368,
    teachersCount: 24,
    established: "2019-09-01",
    status: "inactive",
    facilities: ["Library", "Computer Lab"]
  },
  {
    id: "br1007",
    name: "Central District Hub",
    address: "654 Spruce Avenue, Seattle, WA 98122",
    contactPerson: "Lisa Martinez",
    phoneNumber: "(206) 555-6789",
    email: "central@eduschool.org",
    studentsCount: 526,
    teachersCount: 35,
    established: "2016-08-15",
    status: "active",
    facilities: ["Library", "Sports Field", "Science Lab", "Computer Lab", "Art Studio"]
  }
];