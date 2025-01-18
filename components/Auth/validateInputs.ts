import { Dispatch, SetStateAction } from "react";

export const validate = (name: string, value: string) => {
    if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return false;
        }
    } else if (name === 'password') {
        if (value.length < 8) {
            return false;
        }
    }
    return true

}