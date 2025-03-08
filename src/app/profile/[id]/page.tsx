export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center min-h-screen justify-center py-2">
            <h1 className="text-center text-2xl">Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page <span className=" p-2 rounded bg-orange-500 text-black">{params.id}</span></p>
            <hr />
        </div>
    );
}