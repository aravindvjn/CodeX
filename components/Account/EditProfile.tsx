"use client";
import React, { useActionState, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { FaEdit } from "react-icons/fa";
import Button from "../ui/Button";
import Inputs from "../ui/Inputs";
import { editProfile } from "@/globals/actions/EditProfile";
import { AuthorDataProps } from "../Author/type";
import { useRouter } from "next/navigation";
import { IoIosWarning } from "react-icons/io";

export type DataProps = {
  user: AuthorDataProps;
};
function EditProfile({ user }: DataProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const onClose = () => {
    setIsOpen(false);
  };

  const router = useRouter();

  const [state, action, isPending] = useActionState(editProfile, {
    message: "",
    success: false,
  });

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
      router.refresh();
      setError("");
    } else {
      setError(state?.message);
    }
  }, [state?.success]);
  return (
    <>
      <button
        className={`border mt-2 rounded px-4 py-1 flex items-center gap-2 ${
          user?.username ? "" : "border-red-500"
        }`}
        onClick={() => setIsOpen(true)}
      >
        {user?.username ? (
          <>
            <FaEdit /> Edit Profile
          </>
        ) : (
          <p className="text-red-500 flex items-center gap-1 animate-pulse text-lg">
            <IoIosWarning /> set a username
          </p>
        )}
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form action={action} className="flex flex-col gap-3">
          {error && <p className="text-red-500">{error}</p>}
          <Inputs defaultValue={user?.name} name="name" />
          <Inputs required defaultValue={user?.username} name="username" />
          <Inputs defaultValue={user?.bio} name="bio" />
          <Button isLoading={isPending} type="submit">
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default EditProfile;
