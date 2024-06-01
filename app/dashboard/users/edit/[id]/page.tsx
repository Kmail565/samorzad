import {redirect} from "next/navigation";
import {checkId, getUser} from "@/app/lib/edit";
import EditForm from "@/app/ui/dashboard-users/edit-user-form";
import DeleteButton from "@/app/ui/dashboard-users/delete-button";

type Props = {
    params: {
        id: string;
    }
}

export default async function Edit({params} : Props)
{
    const user = await getUser(params.id);
    const correctId = await checkId(params.id);
    // console.log(correctId);
    if(!correctId) redirect("/dashboard/users/edit");
    return(
        <>
            <h1>Edit User</h1>
            <EditForm user={user} />
            <DeleteButton user={user}/>
        </>
    )
}