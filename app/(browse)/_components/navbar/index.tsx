import { Logo } from "@/app/(browse)/_components/navbar/logo"
import { Search } from "./Search"
import { Actions } from "./actions"

export const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
            <Logo />
            <Search />
            <Actions />
        </nav>
    )
}