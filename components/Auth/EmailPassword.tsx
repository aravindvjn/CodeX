"use client";
import React, { useState } from "react";
import Inputs from "../ui/Inputs";
import { AuthType } from "./type";
import Link from "next/link";
import { validate } from "./validateInputs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export type AuthProps = {
  isLogin?: boolean;
};
export default function EmailPassword({ isLogin }: AuthProps) {
  const router = useRouter();

  //States
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [input, setInput] = useState<AuthType>({
    password: {
      value: "",
      valid: true,
    },
    email: {
      value: "",
      valid: true,
    },
  });
  const [name, setName] = useState<string>("");

  //Handking the change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput: any) => ({
      ...prevInput,
      [name]: {
        value,
        valid: true,
      },
    }));
  };

  const content = isLogin
    ? "Dont Have an Account?"
    : "Already Have an Account?";

  //Submit
  const submitHandler = async (e: any) => {
    e.preventDefault();
    setResponse("");
    //Validating Inputs
    Object.entries(input).forEach((item) => {
      setInput((prevInput: AuthType) => {
        return {
          ...prevInput,
          [item[0]]: {
            ...item[1],
            valid: validate(item[0], item[1].value!),
          },
        };
      });
    });

    if (!input.email?.valid || !input.password?.valid) {
      return;
    }
    if (!isLogin && !name) {
      setError("Name is required");
      return;
    }

    //Signing in
    if (isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        email: input.email.value,
        password: input.password.value,
      });

      if (res?.error) {
        setResponse(res.error);
      } else {
        router.push("/");
      }
    } else {
      // Signing up
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email.value,
          password: input.password.value,
          name: name,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/sign-in");
      } else {
        setResponse(data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-5">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 p-5 w-full text-sm sm:w-[350px] rounded bg-background shadow-sm"
      >
        <p className="text-xl text-center font-bold">
          {isLogin ? "SignIn" : "SignUp"}
        </p>

        {response && <p className="text-red-600">{response}</p>}

        {!isLogin && (
          <Inputs
            maxLength={15}
            isValid={true}
            onChange={(e: any) => {
              setError("");
              setName(e.target.value);
            }}
            name="name"
            value={name}
            type="text"
          />
        )}

        {!isLogin && error && <p className="text-red-600">{error}</p>}
        <Inputs
          isValid={input.email?.valid}
          onChange={handleChange}
          value={input.email?.value}
          name="email"
          type="email"
        />

        <Inputs
          isValid={input.password?.valid}
          onChange={handleChange}
          value={input.password?.value}
          name="password"
          type="password"
        />

        <button
          className="px-3 py-2 rounded bg-blue-600 text-white"
          type="submit"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center">
          {content}{" "}
          <Link
            className="text-blue-400 "
            href={isLogin ? "/sign-up" : "/sign-in"}
          >
            {!isLogin ? "Login" : "Register"}
          </Link>
        </p>
      </form>
    </div>
  );
}
