"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schema";
import { useActionState, useEffect, useEffectEvent, useState } from "react";
import { login } from "@/lib/authActions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Loader2 } from "lucide-react";
import Toast from "./Toast";

export default function LoginForm() {
  // Router
  const router = useRouter();
  // Form
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  //   States
  const [message, formAction, isPending] = useActionState(login, null);
  const [showMessage, setShowMessage] = useState(false);

  console.log(message);

  // Effects
  const displayToast = useEffectEvent(() => {
    setShowMessage(true);
  });
  useEffect(() => {
    if (!message) return;
    displayToast();
  }, [message]);

  const navigate = useEffectEvent(() => {
    router.push("/");
  });
  useEffect(() => {
    if (!message || !message.success) return;
    const timer = setTimeout(() => {
      navigate();
    }, 1500);

    return () => clearTimeout(timer);
  }, [message]);
  return (
    <section className="w-full flex text-grey-1 h-screen overflow-y-hidden ">
      <div className="flex flex-col lg:basis-[50%] items-center gap-8 pt-[67.17px] w-full">
        <div className="flex flex-col gap-3 items-center">
          <Image src="/logo.png" width={162} height={38} alt="logo" />
          <p className="text-blue-1">Sign in to manage your organization</p>
        </div>
        <div className="flex flex-col gap-[31.5px] items-center w-[90%] max-w-md ">
          <form
            action={formAction}
            className="w-full flex flex-col items-center gap-10.25"
          >
            <div className="w-full flex flex-col gap-4">
              <label className="flex flex-col w-full gap-2">
                <p className="text-grey-1 text-bt">Email Address</p>
                <div className="w-full relative">
                  <input
                    type="email"
                    {...register("email")}
                    name="email"
                    className="w-full border-[0.89px] border-grey-4 rounded-lg pl-10 pr-2 py-1 h-9 focus:outline-blue-2/25 placeholder:text-grey-2 text-bt duration-200 transition-colors"
                    placeholder="you@company.com"
                  />
                  <Mail
                    size={20}
                    className="text-grey-2 absolute left-3 top-[50%] -translate-y-[50%]"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[12px]">
                    {errors.email.message}
                  </p>
                )}
              </label>
              <label className="flex flex-col w-full gap-2">
                <div className="flex justify-between w-full">
                  <p className="text-grey-1 text-bt">Password</p>
                  <button
                    className="text-blue-2 text-bt disabled:cursor-not-allowed"
                    disabled
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="w-full relative">
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full border-[0.89px] border-grey-4 rounded-lg pl-10 pr-2 py-1 h-9 focus:outline-blue-2/25 placeholder:text-grey-2 text-bt duration-200 transition-colors"
                    name="password"
                  />
                  <Lock
                    size={20}
                    className="text-grey-2 absolute left-3 top-[50%] -translate-y-[50%]"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[12px]">
                    {errors.password.message}
                  </p>
                )}
              </label>
            </div>
            <button
              className="cursor-pointer disabled:cursor-not-allowed bg-blue-2 w-full rounded-lg text-white h-9 text-bt font-bold flex justify-center items-center disabled:opacity-60 not-disabled:hover:bg-blue-2/80 duration-200 transition-colors "
              disabled={isPending || !isValid}
            >
              {isPending ? (
                <Loader2 size={18} className="text-white animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="flex flex-col gap-[31.5px] items-center w-full">
            <div className="w-full relative flex justify-center">
              <hr className="w-full text-grey-3 absolute top-[50%] -translate-y[50%] left-[50%] -translate-x-[50%] " />
              <p className="text-grey-3 text-bt bg-white z-10 px-1.5">
                Or continue with
              </p>
            </div>
            <button
              className="text-bt text-grey-1 rounded-lg w-full cursor-pointer disabled:cursor-not-allowed border-[0.89px] border-black/10  h-9 flex justify-center items-center disabled:opacity-60 not-disabled:hover:border-black/40 duration-200 transition-colors gap-3"
              disabled
            >
              <span role="icon">
                <Image
                  src="/google.svg"
                  width={16}
                  height={16}
                  alt="Google icon"
                />
              </span>
              Login with Google
            </button>
            <p className="text-bt text-blue-1">
              Don&apos;t have an account?{" "}
              <button
                disabled
                className="text-blue-2 disabled:cursor-not-allowed"
              >
                Contact an administrator
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col basis-[50%] relative">
        <Image
          alt="Login page"
          width={664.44}
          height={773.33}
          src={"/LoginImage.png"}
          className="w-[calc(100dvw/2)] h-auto"
        />
        <div className="text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute w-lg flex flex-col items-center gap-6">
          <p className="text-[36px] font-bold text-center">
            Welcome to the Future of HR Management
          </p>
          <p className="text-[20px] text-center text-blue-3">
            Streamline your workforce operations with powerful tools designed
            for modern HR professionals.
          </p>
          <div className=" text-center gap-2 flex flex-col p-6.25 rounded-[10px] bg-white/10 border-[0.89px] border-white/20  w-full">
            <p className="text-[18px]">💡 HR Tip of the Day</p>
            <p className="text-blue-3">
              Tip: Schedule regular one-on-ones to boost employee engagement by
              40%.
            </p>
          </div>
        </div>
      </div>
      {showMessage && message && (
        <Toast
          type={message.success ? "success" : "error"}
          title={message.success ? "Signin Successful" : "Signin Failed"}
          message={message.message}
          closeToast={() => {
            setShowMessage(false);
          }}
        />
      )}
    </section>
  );
}
