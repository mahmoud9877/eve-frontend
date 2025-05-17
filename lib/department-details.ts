// Detailed information about each department
interface DepartmentDetail {
  description: string
  headcount: number
  manager: string
  metrics: { name: string; value: string }[]
  team?: { name: string; role: string }[]
}

export const departmentDetails: Record<string, DepartmentDetail> = {
  "CF PS": {
    description: "Consumer Facing Product Support department responsible for product strategy and development.",
    headcount: 24,
    manager: "Sarah Johnson",
    metrics: [
      { name: "Projects", value: "12 active" },
      { name: "Completion Rate", value: "87%" },
      { name: "Customer Satisfaction", value: "4.8/5" },
    ],
    team: [
      { name: "John Doe", role: "Product Manager" },
      { name: "Jane Smith", role: "UX Designer" },
      { name: "Bob Johnson", role: "Developer" },
      { name: "Emily Davis", role: "Product Analyst" },
      { name: "Michael Wilson", role: "Technical Writer" },
    ],
  },
  HR: {
    description: "Human Resources department handling recruitment, employee relations, and organizational development.",
    headcount: 15,
    manager: "David Thompson",
    metrics: [
      { name: "Open Positions", value: "8" },
      { name: "Time to Hire", value: "24 days" },
      { name: "Employee Satisfaction", value: "4.2/5" },
    ],
    team: [
      { name: "Lisa Brown", role: "HR Director" },
      { name: "James Wilson", role: "Recruiter" },
      { name: "Patricia Moore", role: "HR Specialist" },
      { name: "Robert Taylor", role: "Training Coordinator" },
    ],
  },
  "MFG & Purchases": {
    description: "Manufacturing and Purchases department responsible for production and supply chain management.",
    headcount: 42,
    manager: "Richard Anderson",
    metrics: [
      { name: "Production Efficiency", value: "92%" },
      { name: "On-time Delivery", value: "95%" },
      { name: "Inventory Turnover", value: "12.3x" },
    ],
  },
  "Line-1": {
    description: "Production Line 1 focused on primary product manufacturing.",
    headcount: 18,
    manager: "Thomas Wright",
    metrics: [
      { name: "Output", value: "12,500 units/day" },
      { name: "Defect Rate", value: "0.8%" },
      { name: "Uptime", value: "97.5%" },
    ],
  },
  QA: {
    description: "Quality Assurance department ensuring product quality and compliance with standards.",
    headcount: 16,
    manager: "Jennifer Lee",
    metrics: [
      { name: "Tests Performed", value: "1,250/week" },
      { name: "Pass Rate", value: "98.2%" },
      { name: "Issues Identified", value: "24 (last 30 days)" },
    ],
  },
}
