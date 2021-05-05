import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchMovies } from "../helpers/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BASE_URL = "http://image.tmdb.org/t/p/original/";

export default function MyCarousel(props) {
    const [list, setList] = useState(undefined);
    const response = fetchMovies({ genre: "trending" });
    useEffect(() => {
        console.log({ response });
        setList(response);
    }, [response]);

    return (
        <div className="h-0.5">
            <Carousel showThumbs={false} showArrows showIndicators autoPlay>
                {list &&
                    list.results &&
                    list.results.map((movie) => {
                        const { backdrop_path } = movie;
                        return (
                            <div>
                                <Image
                                    src={BASE_URL + backdrop_path}
                                    height={100}
                                    width={200}
                                    layout="responsive"
                                />
                            </div>
                        );
                    })}
            </Carousel>
        </div>
    );
}
