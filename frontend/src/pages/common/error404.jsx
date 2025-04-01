import { Link } from "react-router-dom";

const Error404 = () => {
    return (

        <div className="h-screen flex flex-col p-2 items-center justify-center">
            <div className="text-sky-600 font-medium">You seem lost, check the address and try again!</div>
            <Link to={'/'} className="bg-sky-500 p-2 mt-4 border-sky-200 rounded-lg font-semibold shadow-xl text-white" >Back to home</Link>
        </div>
    )
}

export default Error404