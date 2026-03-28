import Link from "next/link";
import Image from "next/image";

export function NavBar() {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">
                    <Image src="/icons/logo.png" width={24} height={24} alt="logo" />
                    <p>DevEvents</p>
                </Link>
                <ul>
                    <Link href="/" className="logo">Home</Link>
                    <Link href="/" className="logo">Events</Link>
                    <Link href="/" className="logo">Create</Link>
                </ul>
            </nav>
        </header>
    )
}