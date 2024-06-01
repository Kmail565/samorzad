import RegisterForm from "../../../ui/forms/register-form";
import {checkId} from "../../../lib/registration";
import {redirect} from "next/navigation";

type Props = {
    params: {
        id: string;
    }
}

export default async function Register({params} : Props)
{
    const correctId = await checkId(params.id);
    // console.log(correctId);
    if(!correctId) redirect("/register");
    return(
        <>
            <h1>Register</h1>
            <RegisterForm params={params}/>
        </>
    )
}