import Router from "next/router";
import { genres } from "../utils/requests";

const NavBar = () => {
    return (
        <nav className="relative">
            <div className="flex px-10 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll overflow-y-hidden scrollbar-hide">
                {Object.entries(genres).map(([key, { title, url }]) => (
                    <h2
                        key={key}
                        onClick={() => Router.push(`/?find=${key}`)}
                        className="cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white last:pr-20"
                    >
                        {title}
                    </h2>
                ))}
            </div>
            {/* TODO: Fix this gradient in next line */}
            <div className="absolute top-0 right-0 bg-gradient-to-l  from-hulublue h-10 w-1/12 z-50" />
        </nav>
    );
};

export default NavBar;
