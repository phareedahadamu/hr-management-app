"use client";
import {
  UserPlus,
  Search,
  Download,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "@/lib/employees";
import { EmployeeDetails } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function EmployeesPageContent() {
  const router = useRouter();
  // States
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: employeesListData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["allEmployees", currentPage],
    queryFn: () => getAllEmployees(currentPage),
  });
  //   console.log(employeesListData);
  const employeesList =
    isPending || error
      ? null
      : !employeesListData.success
        ? null
        : (employeesListData?.data.data as EmployeeDetails[]);

  // employeesTableRows
  const tableRows = !employeesList
    ? null
    : employeesList.map((item, index) => {
        const date = new Date(item.start_date.replace(" ", "T"));

        const formattedDate = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date);
        return (
          <tr
            key={index}
            className="hover:bg-red-500 cursor-pointer"
            onClick={() => {
              router.push(`/employees/${item.id}`);
            }}
          >
            <td className="py-2 px-2 border-t-[0.89px]  border-black/10 bg-white">
              <div className="flex flex-col text-bt ">
                <p className="font-medium text-blue-2">{item.full_name}</p>
                <p className="text-grey-2">{item.email}</p>
              </div>
            </td>
            <td className="py-2 px-2 border-t-[0.89px]  border-black/10 text-center text-bt text-blue-1 bg-white">
              {item.job_title}
            </td>
            <td className="py-2 px-2 border-t-[0.89px]  border-black/10 text-center text-bt text-blue-1 bg-white">
              {item.department[0].toUpperCase() + item.department.slice(1)}
            </td>
            <td className="py-2 px-2 border-t-[0.89px]  border-black/10 text-center text-bt text-blue-1 bg-white">
              {item.location}
            </td>
            <td className="py-2 px-2 border-t-[0.89px] border-black/10  text-center text-bt text-blue-1 bg-white">
              {item.employment_type[0].toUpperCase() +
                item.employment_type.slice(1)}
            </td>
            <td className="py-2 px-2 border-t-[0.89px]  border-black/10 text-center text-bt text-blue-1 bg-white">
              {formattedDate}
            </td>
            <td className="py-2 px-2 border-t-[0.89px] last:border-r-[0.89px] border-black/10 text-center bg-white mx-auto">
              <p
                className={`text-[12px] w-[131.7px] rounded-full leading-5 ${item.status === "active" ? " text-[#008236] bg-[#008236]/25 border-[0.89px] border-[#008236]/40" : item.status === "leave" ? "text-[#A65F00] bg-[#A65F00]/25 border-[0.89px] border-[#A65F00]/40" : item.status === "onboarding" ? " text-[#1447E6] bg-[#1447E6]/25 border-[0.89px] border-[#1447E6]/40" : "text-[#e61492] bg-[#e61492]/25 border-[0.89px] border-[#e61492]/40"}`}
              >
                {item.status[0].toUpperCase() + item.status.slice(1)}
              </p>
            </td>
          </tr>
        );
      });
  return (
    <section className="flex flex-col lg:p-8 p-4  w-full bg-grey-6 gap-6 items-center">
      <header className="w-full lg:flex-row flex flex-col  lg:justify-between justify-start gap-4">
        <div className="flex flex-col gap-1 ">
          <p className="font-bold text-grey-1 text-[30px]">Employees</p>
          <p className="text-blue-1">
            Manage and view your organization&apos;s workforce
          </p>
        </div>
        <Link
          href=""
          className="pointer-events-none bg-blue-2 p-3 rounded-lg flex gap-3 text-white items-center h-11 font-bold text-bt"
        >
          <UserPlus size={16} />
          Add New Employee
        </Link>
      </header>
      <div className="flex w-full justify-between">
        <form className="max-w-123.75 w-full flex relative">
          <input
            type="search"
            placeholder="Search by name, email, title, or department..."
            className="h-9 py-1 rounded-lg bg-white border-[0.89px] border-grey-4  pl-10 pr-4 focus:outline-blue-2/25 w-full"
          />
          <Search
            size={20}
            className="text-grey-2 absolute top-[50%] left-3 -translate-y-[50%]"
          />
        </form>
        <button className="flex gap-4 text-grey-1 border-[0.89px] border-black/10 rounded-lg items-center h-9 px-3 cursor-pointer disabled:cursor-not-allowed not-disabled:hover:border-grey-2 duration-200 transition-colors">
          <Download size={16} />
          Export to CSV
        </button>
      </div>
      {isPending ? (
        <Loader2 size={24} className="animate-spin text-blue-2" />
      ) : error ? (
        <p className="w-full text-center">Something went wrong</p>
      ) : employeesListData && !employeesListData.success ? (
        <p className="w-full text-center">{employeesListData.message}</p>
      ) : (
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="flec w-full overflow-hidden rounded-lg border-[0.89px] border-black/10">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="font-regular text-bt text-grey-1 py-2 pl-2">
                    Employee
                  </th>
                  <th className="font-regular text-bt text-grey-1 py-2 pl-2 text-center ">
                    Job Title
                  </th>
                  <th className="font-regular text-bt text-grey-1 py-2 pl-2 text-center ">
                    Department
                  </th>
                  <th className="font-regular text-bt text-grey-1 py-2 pl-2 text-center ">
                    Location
                  </th>
                  <th className="font-regular text-bt text-grey-1 py-2 pl-2 text-center ">
                    Type
                  </th>
                  <th className="font-regular text-bt text-grey-1 py-2 pl-2 text-center">
                    Start Date
                  </th>
                  <th className="text-center font-regular text-bt text-grey-1 py-2 pr-2 ">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
          <div className="flex w-full justify-between">
            <p className="text-grey-1 text-bt">
              Page <span className="font-bold">{currentPage}</span> of{" "}
              <span className="font-bold">
                {employeesListData.data.last_page}
              </span>
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2.5 rounded-lg border-[0.89px] border-black/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 not-disabled:hover:border-black/30 duration-200 transition-colors"
                disabled={isPending || currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                }}
              >
                <ChevronLeft size={16} className="text-grey-2" />
              </button>
              <button
                className="px-4 py-2.5 rounded-lg border-[0.89px] border-black/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 not-disabled:hover:border-black/30 duration-200 transition-colors"
                disabled={
                  isPending || currentPage === employeesListData.data.last_page
                }
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                }}
              >
                <ChevronRight size={16} className="text-grey-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
