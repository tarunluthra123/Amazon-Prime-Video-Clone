import React, { useEffect, useState } from "react";
import {
    addToFavourites,
    addToWatchlist,
    removeFromFavourites,
    removeFromWatchlist,
} from "../utils/api";
import { getUser } from "../utils/user";

const AddToListButton = ({ title, Icon, id, media }) => {
    const user = getUser();
    const [description, setDescription] = useState(`Login to add to ${title}`);

    function onClick() {
        if (title == "favourites") {
            if (description.slice(0, 3) == "Add") {
                addToFavourites(id, media);
            } else {
                removeFromFavourites(id, media);
            }
        } else {
            if (description.slice(0, 3) == "Add") {
                addToWatchlist(id, media);
            } else {
                removeFromWatchlist(id, media);
            }
        }
    }

    useEffect(() => {
        if (user && user.isLoggedIn) {
            if (title == "favourites") {
                const favourites = user.favourites;
                if (
                    favourites.find(
                        (item) => item.tmdb_id == id && item.media == media
                    )
                ) {
                    setDescription(`Remove from ${title}`);
                } else {
                    setDescription(`Add to ${title}`);
                }
            } else {
                const watchlist = user.watchlist;
                if (
                    watchlist.find(
                        (item) => item.tmdb_id == id && item.media == media
                    )
                ) {
                    setDescription(`Remove from ${title}`);
                } else {
                    setDescription(`Add to ${title}`);
                }
            }
        }
    }, [user]);

    return (
        <button
            title={description}
            className="rounded-full h-8 w-8 flex items-center justify-center bg-white text-hulublue p-2 mx-2 relative group cursor-pointer ml-3 hover:bg-gray-300 duration-100"
            onClick={onClick}
        >
            <Icon />
        </button>
    );
};

export default AddToListButton;
