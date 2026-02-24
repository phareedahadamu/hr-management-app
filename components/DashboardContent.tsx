"use client";
import { useQuery } from "@tanstack/react-query";
import { getdashboardDetails } from "@/lib/dashboard";
import {
  Users,
  TrendingUp,
  UserPlus,
  Calendar,
  Briefcase,
  Loader2,
} from "lucide-react";
import { DashboardDetails } from "@/lib/types";
export default function DashboardContent() {
  const {
    data: dashboardDetailsData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getdashboardDetails(),
  });
  //   console.log(dashboardDetailsData);
  const dashboardDetails =
    dashboardDetailsData && dashboardDetailsData.success
      ? (dashboardDetailsData.data as DashboardDetails)
      : null;
  return (
    <section className="flex flex-col md:p-8 p-4  w-full bg-grey-6 gap-6 items-center min-h-[calc(100dvh-73px)]">
      <header className="w-full  flex   justify-start gap-4">
        <div className="flex flex-col gap-1 ">
          <p className="font-bold text-grey-1 text-[30px]">Dashboard</p>
          <p className="text-blue-1">
            Welcome back! Here&apos;s what&apos;s happening with your
            organization.
          </p>
        </div>
      </header>
      {isPending ? (
        <Loader2 size={24} className="animate-spin text-blue-2" />
      ) : error ? (
        <p className="w-full text-center">Something went wrong</p>
      ) : dashboardDetailsData && !dashboardDetailsData.success ? (
        <p className="w-full text-center">{dashboardDetailsData.message}</p>
      ) : (
        <div className="grid w-full lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border-[0.89px] border-black/10 pt-4 pb-6 px-6 bg-white gap-6 flex flex-col">
            <div className="w-full justify-between flex items-center text-blue-1 text-bt">
              Total Employees <Users size={20} className="text-blue-2" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-grey-1 font-bold text-[30px]">
                {dashboardDetails?.total_employees ?? 0}
              </p>
              <p className="text-[#00A63E] text-bt flex items-center gap-1">
                <TrendingUp size={16} className="text-[#00A63E]" /> _% from last
                month
              </p>
            </div>
          </div>
          <div className="rounded-lg border-[0.89px] border-black/10 pt-4 pb-6 px-6 bg-white gap-6 flex flex-col">
            <div className="w-full justify-between flex items-center text-blue-1 text-bt">
              New Hires This Month
              <UserPlus size={20} className="text-[#00A63E]" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-grey-1 font-bold text-[30px]">
                {dashboardDetails?.new_hire_count ?? 0}
              </p>
              <p className="text-blue-4 text-bt">_ more next week</p>
            </div>
          </div>
          <div className="rounded-lg border-[0.89px] border-black/10 pt-4 pb-6 px-6 bg-white gap-6 flex flex-col">
            <div className="w-full justify-between flex items-center text-blue-1 text-bt">
              Upcoming Events
              <Calendar size={20} className="text-[#9810FA]" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-grey-1 font-bold text-[30px]">
                {dashboardDetails?.upcoming_event ?? 0}
              </p>
              <p className="text-blue-4 text-bt">Birthdays & anniversaries</p>
            </div>
          </div>
          <div className="rounded-lg border-[0.89px] border-black/10 pt-4 pb-6 px-6 bg-white gap-6 flex flex-col">
            <div className="w-full justify-between flex items-center text-blue-1 text-bt">
              Open Positions
              <Briefcase size={20} className="text-[#F54900]" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-grey-1 font-bold text-[30px]">
                {dashboardDetails?.open_positions ?? 0}
              </p>
              <p className="text-blue-4 text-bt">Accross _ departments</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
