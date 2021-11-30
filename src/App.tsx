import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
    const [dataUsers, setDataUsers] = useState<any>([])
    const [deleteId, setDeleteId] = useState<any>([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios({
            method:"GET",
            url: "https://fabrik-api.herokuapp.com/api/v1/fake/users"
        }).then(res => {
            setDataUsers(res.data.data)
            setLoading(false)
        })
    },[setDataUsers])

    const onDelete = async (userId : any) =>{
        setDeleteId(userId)
        const data = await axios({
            url: `https://fabrik-api.herokuapp.com/api/v1/fake/users/${userId}`,
            method: "DELETE",
        });
        console.log(data)
        if (data.status === 200) {
            let newUsers = dataUsers?.filter((user: any) => user.id != userId);
            setDataUsers(newUsers);
        }
    }
    const userList = dataUsers.map((dataUser:any) =>(
        <div key={dataUser.id} className="border py-10 px-5 m-3">
            <p>{dataUser.firstname}</p>
            <p>{dataUser.role}</p>
            <p>{dataUser.email}</p>
            <div className="flex justify-between mt-8">
                <button className='bg-blue-500 px-4 py-2 rounded text-white'>show</button>
                <button className='bg-yellow-500 px-4 py-2 rounded text-white'>update</button>
                <button className='bg-red-500 px-4 py-2 rounded text-white'
                        onClick={() => onDelete(dataUser.id)}>
                    {deleteId === dataUser.id ? "Loading..." : "Delete"}
                </button>

            </div>
        </div>
    ))

    return (
        <div className='px-20'>
            <h1 className='text-5xl w-full text-center'>All users</h1>
            <button className="bg-red-500 px-4 py-2 rounded text-white">{loading ? 'loading...' : 'Add user'}</button>
            <div>
                {loading ? <p className="font-bold">Loading...</p> : <div className='flex-wrap flex mt-20 justify-center'>
                    {userList}
                </div>}
            </div>
        </div>
    );
};

export default App;