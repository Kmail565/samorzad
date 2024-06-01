import {User} from "@/app/lib/definitions";

export default async function DeleteButton({user}: { user: User })
{

    return (
        <div>
            <h2>Are you sure you want to delete {user.email}'s account?</h2>
            <button>Yes</button>
            <button>No</button>
        </div>
    )
}