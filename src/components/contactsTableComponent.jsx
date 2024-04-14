import axios from 'axios'
import React, { useEffect, useState } from 'react'
import maleAvatar from '../assets/img/maleAvatar.png'
import femaleAvatar from '../assets/img/femaleAvatar.png'
import editIcon from '../assets/img/editIcon.svg'
import deleteIcon from '../assets/img/deleteIcon.svg'


export default function ContactsTable() {

    const [allContacts, setAllContacts] = useState([])
    const [editableRows, setEditableRows] = useState(false)
    const [updatedName, setUpdatedName] = useState('')
    const [updatedGender, setUpdatedGender] = useState('')
    const [updatedEmail, setUpdatedEmail] = useState('')
    const [updatedPhoneNo, setUpdatedPhoneNo] = useState('')


    useEffect(() => {

        loadAllContacts()

    }, [])

    const handleNameUpdate = (e) =>{
        setUpdatedName(e.target.value)
    }
    const handleGenderUpdate = (e) =>{
        setUpdatedGender(e.target.value)
    }
    const handleEmailUpdate = (e) =>{
        setUpdatedEmail(e.target.value)
    }
    const handlePhoneNoUpdate = (e) =>{
        setUpdatedPhoneNo(e.target.value)
    }

    const handleSave = ()=> {

        const payload = {
            fullName:updatedName,
            gender:updatedGender,
            email:updatedEmail,
            phoneNumber:updatedPhoneNo
        }

        //ToDo : Implement a model as a component. Then pass this JSON object as a param. Upon confirming update the resource. Then update a state in this file to reload the data list
    }

    const loadAllContacts = async () => {

        const token = localStorage.getItem('TWCtoken')

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        await axios.get('http://localhost:4000/api/contact/', config).then(res => {

            setAllContacts(res.data)

        }).catch(error => {
            console.log("Axios error occured in Contacts Table : " + error)
        })
    }

    const getAvatar = (gender) => {
        if (gender === 'male') {
            return maleAvatar
        } else {
            return femaleAvatar
        }
    }

    const handleEditClick = (id) => {
        console.log("Row ID : " + id)
        setEditableRows(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    return (
        <div className=' w-fit h-2/5 flex  px-8 py-4  bg-white rounded-3xl flex-col'>

            <div className='flex flex-row font-FuturaMdBt font-bold text-[#083F46] justify-start'>
                <span className="px-4 py-2 w-24"></span>
                <span className="px-4 py-2 w-44">Full Name</span>
                <span className="px-4 py-2 w-32 ">Gender</span>
                <span className="px-4 py-2 w-56">Email</span>
                <span className="px-4 py-2 w-40">Phone Number</span>
            </div>

            <div className=' overflow-y-auto overflow-x-hidden'>
                <table className="table-auto  font-FuturaMdBt text-[#083F46]  border-collapse border-transparent">

                    <tbody >
                        {allContacts.map((item) => (

                            <tr key={item._id} className='flex justify-start items-center' >
                                <td className="px-4 py-1 w-24"><img src={getAvatar(item.gender)} /></td>
                                <td className="px-4 py-1 w-44">{editableRows[item._id] ? <input type="text" defaultValue={item.fullName} onChange={handleNameUpdate} className='  bg-gray-300' /> : item.fullName}</td>
                                <td className="px-4 py-1 w-32">{editableRows[item._id] ? <input type="text" defaultValue={item.gender} onChange={handleGenderUpdate} className='  bg-gray-300' /> : item.gender}</td>
                                <td className="px-4 py-1 w-56">{editableRows[item._id] ? <input type="text" defaultValue={item.email} onChange={handleEmailUpdate} className='  bg-gray-300' /> : item.email}</td>
                                <td className="px-4 py-1 w-40">{editableRows[item._id] ? <input type="text" defaultValue={item.phoneNumber} onChange={handlePhoneNoUpdate} className='  bg-gray-300' /> : item.phoneNumber}</td>
                                <td className=" w-20 flex ">
                                    {editableRows[item._id] ?
                                        <div>
                                             <button onClick={() => handleEditClick(item._id)} className='font-FuturaMdBt w-fit h-fit px-8  py-2 font-medium bg-[#083F46] text-white rounded-3xl'>save</button>
                                        </div> : <div className='flex flex-row justify-evenly'>
                                            <img src={editIcon} className=' cursor-pointer' onClick={() => handleEditClick(item._id)} />
                                            <img src={deleteIcon} className=' cursor-pointer' />
                                        </div>}

                                </td>
                                <td className="px-4 py-4">

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}