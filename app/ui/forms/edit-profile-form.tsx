import {getSession} from "@/app/lib/actions";

export default async function EditForm()
{
    const session = await getSession();
    return(
        <>
        <form>
            <div>
                <input
                    name="name"
                    type="text"
                    minLength={1}
                    defaultValue={session.user?.name}
                    placeholder="Enter Your Name"
                />
                <input
                    name="surname"
                    type="text"
                    minLength={1}
                    defaultValue={session.user?.surname}
                    placeholder="Enter Your Surname"
                />
                <button>
                    Save changes
                </button>
            </div>
        </form>
        <form>
            <div>
                <input
                    name="new_password"
                    type="password"
                    placeholder="Your new password"
                />
                <input
                    name="repeat_new_password"
                    type="password"
                    placeholder="Repeat new password"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Your old password"
                />
                <button>
                    Save changes
                </button>
            </div>
        </form>
    </>
    )
}