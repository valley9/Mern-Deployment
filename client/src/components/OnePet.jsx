import React, {useEffect, useState} from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const OnePet = (props) => {
    const [singularPet, setSingularPet] = useState({})



    const deletePet = (e) => {
        axios.delete(`http://localhost:8000/api/pets/delete/${props.petid}`)
            .then(response=>{
                console.log("just sent a delete req")
                console.log(response)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${props.petid}`)
        .then(response=>{
            console.log("response after retrieving one pet", response)
            setSingularPet(response.data.results)
        })
        .catch(err=> console.log(err))
    }, [])
    return (
        <div>
            <h1>Details about: {singularPet.pet_name}</h1>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{singularPet.pet_name}</h4>
                    <p className="card-text">Pet Type: {singularPet.pet_type}</p>
                    <p className="card-text">Description: {singularPet.pet_desc}</p>
                    <p className="card-text">Skill 1: {singularPet.pet_skill_1}</p>
                    <p className="card-text">Skill 2: {singularPet.pet_skill_2}</p>
                    <p className="card-text">Skill 3: {singularPet.pet_skill_3}</p>
                    <button className="btn-danger" onClick={deletePet}>Adopt {singularPet.pet_name}</button>
                </div>
            </div>
        </div>
    );
};


export default OnePet;