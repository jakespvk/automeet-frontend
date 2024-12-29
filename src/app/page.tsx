import Image from "next/image";

export default function Home() {
    return (
        //font-[family-name:var(--font-geist-sans)]">
        <>
            <div className="flex flex-col w-screen h-screen justify-center items-center">
                <h1 className="font-[family-name:var(--font-geist-sans)] text-6xl md:text-8xl 
            drop-shadow-[0_20px_25px_rgba(69,69,69,1)]">Automeet</h1>
                <p className="font-[family-name:var(--font-geist-sans)] md:text-xl pb-5">Putting your people together</p>
                <a className="btn" role="button" href="./getstarted">
                    Get Started
                </a>
            </div>
        </>
    );
}
