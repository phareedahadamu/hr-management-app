import {
  LayoutDashboard,
  FileText,
  Settings,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Briefcase,
  ChartColumn,
} from "lucide-react";
export const appRoutes = [
  { name: "Dashboard", url: "/", icon: LayoutDashboard },
  { name: "Employees", url: "/employees", icon: Users },
  { name: "Time & Attendance", url: "", icon: Clock },
  { name: "Recruitment", url: "", icon: Briefcase },
  { name: "Payroll", url: "", icon: DollarSign },
  { name: "Calendar", url: "", icon: Calendar },
  { name: "Reports", url: "", icon: ChartColumn },
  { name: "Documents", url: "", icon: FileText },
  { name: "Settings", url: "", icon: Settings },
];
