/**
 * @description - This component is used to display the contacts in a table view. Also this component handles the model activation to display save success, confirm delete models
 */

//imoports
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import maleAvatar from '../assets/maleAvatar.png'
import femaleAvatar from '../assets/femaleAvatar.png'
import editIcon from '../assets/editIcon.svg'
import deleteIcon from '../assets/deleteIcon.svg'
import Modal from './ModelComponent'
import editRowRectangleImg from '../assets/editRect.svg'
import editRowSwitchGenderImg from '../assets/genderSwitch.svg'

export default function ContactsTable() {

    //States
    const [allContacts, setAllContacts] = useState([])
    const [editableRows, setEditableRows] = useState(false)
    const [updatedName, setUpdatedName] = useState('')
    const [updatedGender, setUpdatedGender] = useState('')
    const [updatedEmail, setUpdatedEmail] = useState('')
    const [updatedPhoneNo, setUpdatedPhoneNo] = useState('')
    const [openSaveModel, setSaveModelOpen] = useState(false)
    const [openDeleteModel, setDeleteModelOpen] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [contactToBeDeleted, setContactToBeDeleted] = useState('')

    useEffect(() => {

        //Loads all the contacts from DB when page loads
        loadAllContacts()

    }, [openSaveModel, openDeleteModel]) //useEffect is running everytime either openSaveModel state or openDeleteModel state updates inorder to get the updated contact list after the modification(by edit or delete)

    //State change handlers
    const handleNameUpdate = (e) => {
        setUpdatedName(e.target.value)
    }
    const handleGenderUpdate = (e) => {
        setUpdatedGender(e.target.value)
    }
    const handleEmailUpdate = (e) => {
        setUpdatedEmail(e.target.value)
    }
    const handlePhoneNoUpdate = (e) => {
        setUpdatedPhoneNo(e.target.value)
    }

    //Updates the row with new data, opens the save success model
    const handleSave = async (id) => {

        const token = localStorage.getItem('TWCtoken')

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`

            }
        }

        const currentContact = getCurrentContact(id)


        const payload = {
            fullName: updatedName || currentContact.fullName,
            gender: updatedGender || currentContact.gender,
            email: updatedEmail || currentContact.email,
            phoneNumber: updatedPhoneNo || currentContact.phoneNumber
        }


        await axios.patch(`http://localhost:4000/api/contact/${id}`, payload, config).then(() => {

            setSaveModelOpen(true)

        }).catch(error => {
            console.log("Error at contact Update : " + error)
        }).finally(() => {
            //Clean up - this fucntion clears the updated values from the relevent states after an update
            handleSuccessfulUpdate()
        })

        //Sets the editable state of row
        handleEditClick(id)


    }

    //Retrieves the selected contact's _id
    const getCurrentContact = (id) => {

        return allContacts.find(contact => contact._id === id)
    }


    const handleSuccessfulUpdate = () => {

        setUpdatedName('')
        setUpdatedEmail('')
        setUpdatedPhoneNo('')
        setUpdatedGender('')

    }

    //Stores the selected contact in a state(to access fullName property later on) and opens up the delete confirm model
    const handleDelete = (id) => {

        const currentContact = getCurrentContact(id)

        setContactToBeDeleted(currentContact)

        setDeleteModelOpen(true)
    }

    //Deletes the contact from DB
    const deleteContact = async () => {

        const token = localStorage.getItem('TWCtoken')

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`

            }
        }

        await axios.delete(`http://localhost:4000/api/contact/${contactToBeDeleted._id}`, config).then(() => {

            setDeleteSuccess(true)

        }).catch(error => {
            console.log("Error at contact delete : " + error)
        }).finally(() => {
            //Clean up - clears the state back to normal
            setContactToBeDeleted('')

        })
    }

    //Handles the "Okay" btn in delete model. 
    const handleDeleteSuccess = () => {

        setDeleteModelOpen(false)
        setDeleteSuccess(false)
    }

    //Loads all the contacts from the DB as a list
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

    //This function determines avatar type to be used by the each row based on contact's gender
    const getAvatar = (gender) => {
        if (gender === 'Male') {
            return maleAvatar
        } else {
            return femaleAvatar
        }
    }

    //Changes the row editable state
    const handleEditClick = (id) => {
        console.log("Row ID : " + id)
        setEditableRows(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    //Handles the gender toggling in row edit mode
    const toggleGender = () => {
        setUpdatedGender(prevGender => prevGender === "Male" ? "Female" : "Male")
    }

    return (
        <div className=' w-fit h-72 flex  px-8 py-4  bg-white rounded-3xl flex-col'>

            <div className='flex flex-row font-FutuBd font-bold text-[#083F46] justify-start'>
                <span className="px-4 py-2 w-24"></span>
                <span className="px-4 py-2 mr-5 w-44">full name</span>
                <span className="px-4 py-2 mr-5 w-28 ">gender</span>
                <span className="px-4 py-2 mr-5 w-56">e-mail</span>
                <span className="px-4 py-2 mr-5 w-40">phone number</span>
            </div>

            <div className=' overflow-y-auto overflow-x-auto'>
                <table className="table-auto  font-FuturaMdBt  text-[#083F46]  border-collapse border-transparent">

                    <tbody >
                        {allContacts.map((item) => (

                            <tr key={item._id} className='flex justify-start items-center' >
                                <td className="px-4 py-1 w-24"><img src={getAvatar(item.gender)} /></td>
                                <td className=" mr-5 w-44 font-normal ">{editableRows[item._id] ? <div className='flex flex-row  bg-[#E7ECED]'> <input type="text" defaultValue={item.fullName} onChange={handleNameUpdate} className=' w-full px-4 py-1  bg-[#E7ECED]' /> <img src = {editRowRectangleImg} className='mr-1'/> </div>:  <div className='px-4 py-1'>{item.fullName}</div> }</td>
                                <td className=" mr-5 w-28 font-normal">{editableRows[item._id] ? (<div className="flex flex-row  bg-[#E7ECED]"><input type="text" value={updatedGender || item.gender} className="  pl-4 py-1 w-full bg-[#E7ECED]" readOnly onChange={handleGenderUpdate} /><button onClick={() => toggleGender()}> <img src = {editRowSwitchGenderImg} className=' w-5  h-fit mr-6'/></button> </div>  ) : ( <div className='px-4 py-1'>{item.gender}</div> )} </td>

                                <td className=" mr-5 w-56 font-normal">{editableRows[item._id] ? <div className='flex flex-row  bg-[#E7ECED]'><input type="text" defaultValue={item.email} onChange={handleEmailUpdate} className=' px-4 py-1 w-full  bg-[#E7ECED]' /> <img src = {editRowRectangleImg} className='mr-1'/> </div> : <div className='px-4 py-1'>{item.email}</div> }</td>
                                <td className="mr-5 w-40 font-normal">{editableRows[item._id] ? <div className='flex flex-row  bg-[#E7ECED]'><input type="text" defaultValue={item.phoneNumber} onChange={handlePhoneNoUpdate} className=' px-4 py-1 w-full bg-[#E7ECED]' /> <img src = {editRowRectangleImg} className='mr-1'/> </div>:<div className='px-4 py-1'>{item.phoneNumber}</div> }</td>
                                <td className="mr-5 w-20 flex ">
                                    {editableRows[item._id] ?
                                        <div>
                                            <button onClick={() => handleSave(item._id)} className='font-FuturaMdBt w-fit h-fit px-8  py-2 font-medium bg-[#083F46] text-white rounded-3xl'>save</button>
                                        </div> : <div className='flex flex-row justify-evenly gap-6'>
                                            <img src={editIcon} className='hover:scale-105 cursor-pointer' onClick={() => handleEditClick(item._id)} />
                                            <img src={deleteIcon} className='hover:scale-105 cursor-pointer' onClick={() => handleDelete(item._id)} />
                                        </div>}

                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Save success model */}
            <Modal open={openSaveModel} onClose={() => setSaveModelOpen(false)}>
                <div className="text-center w-full">

                    <div className="mx-auto my-4 flex justify-center">

                        <p className=" w-fit mb-5 text-2xl font-semibold text-[#083F46]">
                            Your contact has been saved successfully!
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <button className="font-FuturaMdBt w-fit h-fit px-8  py-2 text-lg font-medium bg-[#083F46] text-white rounded-3xl" onClick={() => setSaveModelOpen(false)}>Okay</button>

                    </div>
                </div>
            </Modal>

            {/* Delete confirmation model */}
            <Modal open={openDeleteModel} onClose={() => setDeleteModelOpen(false)}>
                {deleteSuccess ? (
                    <div className="text-center w-full">

                        <div className="mx-auto my-4 flex justify-center">

                            <p className=" w-fit mb-5 text-2xl font-semibold text-[#083F46]">
                                Your contact has been deleted successfully!
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <button className="font-FuturaMdBt w-fit h-fit px-8  py-2 font-medium text-lg bg-[#083F46] text-white rounded-3xl" onClick={() => handleDeleteSuccess()}>Okay</button>

                        </div>
                    </div>
                ) : (
                    
                    <div className="text-center w-full">
                        <div className="mx-auto my-4 flex justify-center">

                            <p className=" w-fit mb-5 text-2xl font-semibold text-[#083F46]">
                                Do you want to delete the contact “{contactToBeDeleted.fullName}”?
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <button className="font-FuturaMdBt w-fit h-fit px-8 mx-2 py-2 font-medium bg-[#083F46] text-white text-lg rounded-3xl" onClick={() => deleteContact()}>Yes</button>
                            <button className="font-FuturaMdBt w-fit h-fit px-5 mx-2 py-2  bg-white text-[#083F46] text-lg font-semibold rounded-3xl border-2 border-[#083F46]" onClick={() => setDeleteModelOpen(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

