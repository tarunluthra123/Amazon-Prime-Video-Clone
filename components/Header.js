import React, { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import {
    HomeIcon,
    LightningBoltIcon,
    SearchIcon,
    UserIcon,
    ClockIcon,
    HeartIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";
import SearchBox from "./SearchBox";

const Header = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
                <div className="flex flex-grow justify-evenly max-w-2xl">
                    <HeaderItem
                        title="HOME"
                        Icon={HomeIcon}
                        onClick={() => Router.push("/")}
                    />
                    <HeaderItem title="TRENDING" Icon={LightningBoltIcon} />
                    <HeaderItem
                        title="WATCHLIST"
                        Icon={ClockIcon}
                        onClick={() => Router.push("/watchlist")}
                    />
                    <HeaderItem
                        title="FAVOURITES"
                        Icon={HeartIcon}
                        onClick={() => Router.push("/favourites")}
                    />
                    <HeaderItem
                        title="SEARCH"
                        Icon={SearchIcon}
                        onClick={() => setToggle((prev) => !prev)}
                    />
                    <HeaderItem
                        title="ACCOUNT"
                        Icon={UserIcon}
                        onClick={() => Router.push("/login")}
                    />
                </div>
                {toggle && <SearchBox className="sm:hidden w-full lg:flex" />}
                <Image
                    src="/hulu_logo.png"
                    width={100}
                    height={50}
                    className="object-contain"
                />
            </header>
            {toggle && (
                <SearchBox className="hidden sm:flex m-5 mb-7 lg:hidden" />
            )}
        </div>
    );
};

export default Header;
