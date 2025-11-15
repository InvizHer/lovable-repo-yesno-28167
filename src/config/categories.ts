// Category configuration for complaint boxes and their subcategories

export interface CategoryOption {
  value: string;
  label: string;
  subcategories: string[];
}

export const COMPLAINT_BOX_CATEGORIES: CategoryOption[] = [
  {
    value: "education_school",
    label: "Education - School",
    subcategories: [
      "Teacher Behaviour",
      "Class Issues",
      "Facility Issues",
      "Bullying & Harassment",
      "Homework & Academics",
      "Transportation",
      "Canteen & Food",
      "Sports & Activities",
      "Other"
    ]
  },
  {
    value: "education_college",
    label: "Education - College",
    subcategories: [
      "Professor Behaviour",
      "Course Content",
      "Examination Issues",
      "Facility Issues",
      "Ragging & Harassment",
      "Assignment & Projects",
      "Library Services",
      "Laboratory Issues",
      "Placement Issues",
      "Other"
    ]
  },
  {
    value: "education_university",
    label: "Education - University",
    subcategories: [
      "Faculty Issues",
      "Research & Publications",
      "Administration Issues",
      "Facility Issues",
      "Hostel Issues",
      "Examination Issues",
      "Campus Services",
      "Other"
    ]
  },
  {
    value: "company_hr",
    label: "Company - HR Department",
    subcategories: [
      "Workplace Harassment",
      "Salary & Benefits Issues",
      "Leave Management",
      "Discrimination",
      "Manager Issues",
      "Work Environment",
      "Policy Concerns",
      "Other"
    ]
  },
  {
    value: "company_it",
    label: "Company - IT Department",
    subcategories: [
      "System Issues",
      "Access Problems",
      "Software Issues",
      "Hardware Problems",
      "Network Issues",
      "Security Concerns",
      "Other"
    ]
  },
  {
    value: "company_finance",
    label: "Company - Finance",
    subcategories: [
      "Payment Issues",
      "Reimbursement Delays",
      "Invoice Problems",
      "Budget Concerns",
      "Expense Reports",
      "Other"
    ]
  },
  {
    value: "company_operations",
    label: "Company - Operations",
    subcategories: [
      "Process Issues",
      "Quality Concerns",
      "Supply Chain",
      "Vendor Issues",
      "Resource Allocation",
      "Other"
    ]
  },
  {
    value: "hostel_warden",
    label: "Hostel/PG - Warden Office",
    subcategories: [
      "Room Issues",
      "Water & Electricity",
      "Warden Behaviour",
      "Security Issues",
      "Visitor Policy",
      "Curfew Issues",
      "Other"
    ]
  },
  {
    value: "hostel_mess",
    label: "Hostel/PG - Mess & Food",
    subcategories: [
      "Food Quality",
      "Hygiene Issues",
      "Menu Problems",
      "Timing Issues",
      "Staff Behaviour",
      "Other"
    ]
  },
  {
    value: "hostel_maintenance",
    label: "Hostel/PG - Maintenance",
    subcategories: [
      "Cleaning Issues",
      "Repair Requests",
      "Plumbing Problems",
      "Electrical Issues",
      "Furniture Issues",
      "Common Area Issues",
      "Other"
    ]
  },
  {
    value: "hostel_security",
    label: "Hostel/PG - Security",
    subcategories: [
      "Security Guard Behaviour",
      "Safety Concerns",
      "Entry/Exit Issues",
      "Lost & Found",
      "Unauthorized Access",
      "Other"
    ]
  },
  {
    value: "government",
    label: "Government Office",
    subcategories: [
      "Service Delay",
      "Staff Behaviour",
      "Corruption",
      "Document Issues",
      "Facility Issues",
      "Other"
    ]
  },
  {
    value: "healthcare",
    label: "Healthcare Facility",
    subcategories: [
      "Doctor Behaviour",
      "Nurse Behaviour",
      "Treatment Issues",
      "Billing Issues",
      "Cleanliness",
      "Wait Time",
      "Medication Issues",
      "Other"
    ]
  },
  {
    value: "retail",
    label: "Retail Store",
    subcategories: [
      "Product Quality",
      "Staff Behaviour",
      "Billing Issues",
      "Return/Exchange",
      "Store Condition",
      "Other"
    ]
  },
  {
    value: "other",
    label: "Other (Custom)",
    subcategories: []
  }
];

// Helper function to get category label
export const getCategoryLabel = (value: string): string => {
  const category = COMPLAINT_BOX_CATEGORIES.find(cat => cat.value === value);
  return category?.label || value;
};

// Helper function to get subcategories for a category
export const getSubcategories = (categoryValue: string): string[] => {
  const category = COMPLAINT_BOX_CATEGORIES.find(cat => cat.value === categoryValue);
  return category?.subcategories || [];
};

// Helper function to check if category requires custom input
export const requiresCustomInput = (categoryValue: string): boolean => {
  return categoryValue === "other";
};
