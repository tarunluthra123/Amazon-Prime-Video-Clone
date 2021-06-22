import React, { useState } from "react";
import Router from "next/router";

const SearchBox = ({ className }) => {
    const [queryString, setQueryString] = useState("");
    function onClick() {
        const query = queryString;

        return Router.push(`/search?query=${query}`);
    }

    return (
        <div className={"flex px-10 mb-2 " + className}>
            <input
                className="py-3 px-6 min-h-12 ml-2 w-full font-bold  outline-none border-2 border-solid border-gray-300 rounded-full bg-hulublue text-sm"
                type="text"
                placeholder="Find your favourite movies and shows"
                onChange={(e) => {
                    setQueryString(e.target.value);
                }}
                value={queryString}
            />
            <button
                onClick={onClick}
                className="rounded-full bg-gray-300 text-black hover:bg-gray-100 px-6 py-1 mx-2 outline-none focus:outline-none"
            >
                Find
            </button>
        </div>
    );
};

export default SearchBox;
