type Props = {
    params: {
        id: string;
    }
}

export default function Register({params} : Props)
{
    return(
        <>
            <h1>Dob dob dob</h1>
            <h2>{params.id}</h2>
        </>
    )
}