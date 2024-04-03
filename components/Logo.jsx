import Image from "next/image";


export default function Logo() {
    return (
        <div className="hidden lg:flex">
            <a aria-label="Home" href="/">
                <Image
                    src="/logo.svg"
                    alt="Protocol"
                    className="h-6 w-auto"
                    width={50}
                    height={50}
                />
            </a>
        </div>
    )
}
