import Navbar from "@/app/ui/navbar";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}
