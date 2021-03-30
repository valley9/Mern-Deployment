import React, {useState, useEffect} from 'react';
import { Link } from '@reach/router';
import axios from 'axios';

const AllPets = () => {

    const [allPets, setAllPets] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/pets/all")
            .then(response => {
                console.log("***********")
                console.log(response)
                setAllPets(response.data.results)
            })
            .catch(err=> console.log("errors retrieving all things") )
    }, [])


    return (
        <div className="">
                <h2>These pets are looking for a good home</h2>
                {allPets.map((pet, i)=>{
                    return <table>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                            <tr>
                                <td>{pet.pet_name}</td>
                                <td>{pet.pet_type}</td>
                                <td><button><Link to = {`/api/pets/${pet._id}`}>details</Link></button> | <button><Link to = {`/api/pets/update/${pet._id}`}>edit</Link></button></td>
                            </tr>
                        </table>
                })
            }
            </div>
    )};

export default AllPets;

