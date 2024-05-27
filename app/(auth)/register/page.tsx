import Link from "next/link";

export default function RegisterPage()
{
    return(
        <>
            <h1>Register</h1>
            <Link href={"/register/1"}> Link to register </Link>
        </>
    )
}
