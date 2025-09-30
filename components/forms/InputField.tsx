import React from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import Undici from "undici-types";
import errors = Undici.errors;

const InputField = ({name , label , placeholder , type="text" , register , error , validation , disabled , value}:FormInputProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            <Input
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value} // controlled value
                className={cn("form-input", {
                    "opacity-50 cursor-not-allowed": disabled,
                })}
                {...register(name, validation)} // includes onChange, onBlur, ref
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )
}
export default InputField
