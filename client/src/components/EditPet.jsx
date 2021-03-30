import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const EditPet = (props) => {
    const [formInfo, setFormInfo] = useState({
        pet_name: "",
        pet_type: "",
        pet_desc: "",
        pet_skills: ""
    })
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${props.petid}`)
        .then(response=>{
            console.log(response)
            setFormInfo(response.data.results)
        })
        .catch()
    }, [])
    const [errors, setErrors] = useState({})


    const changeHandler = (e)=>{
        console.log("change")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/pets/update/${props.petid}`, formInfo)
            .then(response=>{
                console.log(response)
                if(response.data.errors){
                    console.log("Validation errors")
                    setErrors(response.data.errors)
                }
                else{
                    navigate('/')
                }
                
            })
            .catch(err=> console.log(err))
    }

    return (
        <div>
            <h3>Edit {props.petid}</h3>
            <div>
                <h2>Know a pet needing a home?</h2>
                <form onSubmit = {submitHandler} className="col-6 mx-auto">
                    <div className="form-group">
                        <label htmlFor="">Pet Name: </label>
                        <input type="text" name="pet_name" id="" className="form-control" onChange= {changeHandler} value={formInfo.pet_name}/>
                        <p className="text-danger">{errors.pet_name? "Pet name must be " + errors.pet_name.kind: ""}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pet Type: </label>
                        <input type="text" name="pet_type" id="" className="form-control" onChange= {changeHandler} value={formInfo.pet_type}/>
                        <p className="text-danger">{errors.pet_type? errors.pet_type.message: ""}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pet Description: </label>
                        <input type="text" name="pet_desc" id="" className="form-control" onChange= {changeHandler} value={formInfo.pet_desc}/>
                        <p className="text-danger">{errors.pet_desc? errors.pet_desc.message: ""}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pet Skills: (optional)</label>
                        <input type="text" name="pet_skills" id="" className="form-control" onChange= {changeHandler} value={formInfo.pet_skill_1}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pet Skills: (optional)</label>
                        <input type="text" name="pet_skills" id="" className="form-control" onChange= {changeHandler} value={formInfo.pet_skill_2}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pet Skills: (optional)</label>
                        <input type="text" name="pet_skills" id="" className="form-control" onChange= {changeHandler} value={formInfo.pet_skill_3}/>
                    </div>
                    <input type="submit" value="Add Pet"/>
                </form>
            </div>
        </div>
    );
};


export default EditPet;