"use client";
import { LuRefreshCw } from "react-icons/lu";
import React, { useActionState, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { editProfile } from "@/globals/actions/EditProfile";
import toast from "react-hot-toast";
function EditName({ name }: { name: string }) {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [state, action, isPending] = useActionState(editProfile, undefined);
  const [newName, setNewName] = useState<string>(name);
  const toggetEdit = () => {
    setShowEdit((prev) => !prev);
  };
  useEffect(() => {
    if (state?.message && !state.name) {
      toast.error(state.message);
    } else {
      setShowEdit(false);
      setNewName(state?.name);
    }
  }, [state?.message, isPending]);

  useEffect(() => {
    setNewName(name);
  }, []);
  return (
    <form
      action={action}
      className="flex justify-center items-center gap-2 relative"
    >
      {!isPending && showEdit ? (
        <input
          maxLength={15}
          name="name"
          className="bg-background text-xl md:text-3xl font-bold text-center w-1/2"
          defaultValue={newName}
        />
      ) : (
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          {newName}
        </h1>
      )}
      {!isPending ? (
        showEdit ? (
          <div className="flex items-center gap-1">
            <button onClick={toggetEdit}>
              <AiOutlineCloseCircle size={20} />
            </button>
            <button>
              <AiOutlineCheckCircle size={20} />
            </button>
          </div>
        ) : (
          <button onClick={toggetEdit} className="opactiy-60">
            <FaEdit />
          </button>
        )
      ) : (
        <LuRefreshCw size={20} />
      )}
    </form>
  );
}

export default EditName;
