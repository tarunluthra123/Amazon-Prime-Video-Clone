import Image from "next/image";
import {
    SearchIcon,
    UserCircleIcon,
    ChevronDownIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const active = router.pathname;

    return (
        <div className="bg-darkblue-primary h-auto w-screen text-xl text-gray-400 font-lato pt-1 pl-1 pb-1 flex justify-between">
            <span className="flex justify-around items-center md:w-1/2 md:justify-between">
                <Image
                    src="/primelogo.png"
                    width={120}
                    height={48.39}
                    alt="Prime Video"
                />
                <span className="md:hidden flex justify-around w-2/5 items-center text-sm">
                    Browse
                    <ChevronDownIcon className=" h-6 w-6" />
                </span>
                <span className="hidden md:flex flex-row justify-around w-2/3  items-center text-base">
                    <span
                        className={"navLink" + (active == "/" ? " active" : "")}
                    >
                        <Link href="/">Home</Link>
                    </span>
                    <span
                        className={
                            "navLink" + (active == "/tv" ? " active" : "")
                        }
                    >
                        <Link href="/tv">TV Shows</Link>
                    </span>
                    <span
                        className={
                            "navLink" + (active == "/movie" ? " active" : "")
                        }
                    >
                        <Link href="/movie">Movies</Link>
                    </span>
                    <span
                        className={
                            "navLink" + (active == "/kids" ? " active" : "")
                        }
                    >
                        <Link href="/kids">Kids</Link>
                    </span>
                </span>
            </span>
            <span className="flex justify-evenly w-2/5 items-center">
                <SearchIcon className="h-6 w-6 hover:text-white cursor-pointer" />
                <span className="flex justify-around w-3/5 items-center group cursor-pointer">
                    <UserCircleIcon className="text-blue-300 h-8 w-8" />
                    <span className="group-hover:text-white">Tarun</span>
                    <ChevronDownIcon className="h-6 w-6" />
                </span>
            </span>
        </div>
    );
};

export default Header;
