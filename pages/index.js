import Header from "../components/Header";
import Carousel from "../components/Carousel";

export default function Home() {
    return (
        <div>
            <Header />
            <main className="bg-darkblue-secondary h-screen">
                <Carousel />
            </main>
        </div>
    );
}
