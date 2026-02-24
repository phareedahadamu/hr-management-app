"use client";
import { useQuery } from "@tanstack/react-query";
import { getSingleEmployee } from "@/lib/employees";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { SingleEmployeeDetails } from "@/lib/types";
import { timeElapsed } from "@/lib/utils";
export default function SingleEmployeePageContent({ id }: { id: number }) {
  // router
  const router = useRouter();

  //   States
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  // Fetch employees details
  const {
    data: employeeDetailsData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["singleEmployee", id],
    queryFn: () => getSingleEmployee(id),
  });

  const employeeDetails = !employeeDetailsData
    ? null
    : !employeeDetailsData.success
      ? null
      : (employeeDetailsData.data as SingleEmployeeDetails);

  const tenureTime = employeeDetails
    ? timeElapsed(employeeDetails?.start_date)
    : "-";

  const startDate = employeeDetails
    ? new Date(employeeDetails.start_date.replace(" ", "T"))
    : undefined;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(startDate);

  const PersonalInfo = () => {
    return (
      <div className="w-full flex flex-col gap-7.5">
        <p>Personal Information</p>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid lg:grid-cols-5 grid-cols-1 md:grid-cols-2 justify-between gap-3 lg:gap-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Email</p>
              <p className="text-grey-1">-</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Phone</p>
              <p className="text-grey-1">-</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Date of Birth</p>
              <p className="text-grey-1">{employeeDetails?.dob}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Address</p>
              <p className="text-grey-1">{employeeDetails?.address}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Department</p>
              <p className="text-grey-1">
                {employeeDetails
                  ? employeeDetails?.department[0].toUpperCase() +
                    employeeDetails?.department.slice(1)
                  : ""}
              </p>
            </div>
          </div>
          <hr className="w-full text-grey-4" />
          <div className="flex flex-col gap-4 w-full">
            <p className="text-[18px] font-bold">Emergency Contact</p>
            <div className="w-full grid lg:grid-cols-3 grid-cols-1 justify-between gap-3 lg:gap-0">
              <div className="flex flex-col gap-1.5">
                <p className="text-bt text-blue-4">Name</p>
                <p className="text-grey-1">{employeeDetails?.next_of_kin}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-bt text-blue-4">RelationShip</p>
                <p className="text-grey-1">-</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-bt text-blue-4">Phone</p>
                <p className="text-grey-1">{employeeDetails?.phone_no_nok}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const Employment = () => {
    return (
      <div className="w-full flex flex-col gap-7.5">
        <p>Employment Details</p>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 justify-between gap-3 lg:gap-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Job Title</p>
              <p className="text-grey-1">
                {employeeDetails
                  ? employeeDetails.job_title[0].toUpperCase() +
                    employeeDetails?.job_title.slice(1)
                  : ""}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Department</p>
              <p className="text-grey-1">
                {employeeDetails
                  ? employeeDetails.department[0].toUpperCase() +
                    employeeDetails?.department.slice(1)
                  : ""}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Employment Type</p>
              <p className="text-grey-1">
                {employeeDetails
                  ? employeeDetails.emp_type[0].toUpperCase() +
                    employeeDetails?.emp_type.slice(1)
                  : ""}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Start Date</p>
              <p className="text-grey-1">{formattedDate}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Manager</p>
              <p className="text-grey-1">{employeeDetails?.manager}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-bt text-blue-4">Current Salary</p>
              <p className="text-grey-1">
                {"$" + Number(employeeDetails?.current_salary)}
              </p>
            </div>
          </div>
          <hr className="w-full text-grey-4" />
          <div className="flex flex-col gap-4 w-full">
            <p className="text-[18px] font-bold">Tenure at company</p>
            <p>{tenureTime}</p>
          </div>
        </div>
      </div>
    );
  };
  //   tabs
  const tabs = [
    { id: 1, name: "Personal Info", component: PersonalInfo },
    { id: 2, name: "Employment", component: Employment },
  ];
  //   tabComponent
  const tabComps = tabs.map((tab, index) => (
    <button
      onClick={() => {
        setActiveTab(tab.id);
      }}
      key={index}
      className={`w-49.5 h-7.25 leading-7.25 text-center rounded-full duration-200 transition-colors ${activeTab === tab.id ? "bg-white hover:bg-white" : "bg-none hover:bg-blue-3"} cursor-pointer text-grey-1 text-bt`}
    >
      {tab.name}
    </button>
  ));
  const ActiveTabComponent = tabs.find(
    (tab) => tab.id === activeTab,
  )?.component;

  return (
    <section className="flex flex-col md:p-8 p-4  w-full bg-grey-6 gap-6 items-center min-h-[calc(100dvh-73px)]">
      <button
        className="flex text-grey-1 gap-4.25 text-bt w-full justify-start cursor-pointer hover:text-grey-2 duration-200 transition-colors items-center"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft size={16} className="text-grey-1" /> Back to Employees
      </button>
      {isPending ? (
        <Loader2 size={24} className="animate-spin text-blue-2" />
      ) : error ? (
        <p className="w-full text-center">Something went wrong</p>
      ) : employeeDetailsData && !employeeDetailsData.success ? (
        <p className="w-full text-center">{employeeDetailsData.message}</p>
      ) : (
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="flex gap-6 bg-white rounded-lg border-[0.89px] border-black/10 px-8 py-8.75 w-full">
            {employeeDetails?.image_url && !imageError && (
              <Image
                alt="Profile pic"
                src={employeeDetails?.image_url}
                width={96}
                height={96}
                loading="lazy"
                onError={() => {
                  setImageError(true);
                }}
              />
            )}
            {imageError && (
              <div className="size-24 rounded-full bg-grey-2 text-white flex justify-center leading-24 text-[40px]">
                {employeeDetails?.full_name[0].toUpperCase()}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <p className="text-grey-1 text-[30px] font-bold">
                {employeeDetails?.full_name ?? ""}
              </p>
              <p className="text-blue-1 text-[20px]">
                {employeeDetails?.job_title ?? ""}
              </p>
              <p className="flex gap-3 items-center">
                <span className="rounded-full text-[12px] text-[#008236] py-0.5 px-3 bg-[#008236]/10 border-[0.89px] border-[#008236]/40">
                  N/A
                </span>
                <span className="text-bt text-blue-4">
                  {employeeDetails
                    ? employeeDetails?.emp_type[0].toUpperCase() +
                      employeeDetails?.emp_type.slice(1)
                    : ""}
                </span>
              </p>
            </div>
          </div>
          <div className="w-full flex h-9 rounded-full bg-grey-4 items-center px-1">
            {tabComps}
          </div>
          {ActiveTabComponent && (
            <div className="bg-white rounded-lg border-[0.89px] border-grey-4 p-6 w-full flex">
              <ActiveTabComponent />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
