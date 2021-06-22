import React, { useState } from "react";

const CredentialInputBox = ({ title, type, onChange }) => {
    const [hasContent, setHasContent] = useState(false);

    const label = title[0].toUpperCase() + title.slice(1);

    return (
        <div className="w-full h-14 text-gray-400 my-5 relative group  sign-in-form-input p-0">
            <input
                type={type}
                id={title}
                name={title}
                onChange={onChange}
                className="w-full outline-none text-black pl-4 pt-2 h-16 rounded-md border-2 border-gray-400 border-solid mt-0"
                onBlur={(e) => {
                    if (e.target.value?.length > 0) {
                        setHasContent(true);
                    } else {
                        setHasContent(false);
                    }
                }}
            />
            <label
                htmlFor={title}
                className={
                    "cursor-none absolute transition-all transition-duration-100 ease-in-out left-4 " +
                    (hasContent ? "top-1 text-sm" : "top-4 text-base")
                }
            >
                {label}
            </label>
        </div>
    );
};

export default CredentialInputBox;
