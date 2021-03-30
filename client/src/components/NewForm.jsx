import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';

const NewForm = () => {
    const [formInfo, setFormInfo] = useState({
        pet_name: "",
        pet_type: "",
        pet_desc: "",
        pet_skill1: "",
        pet_skill2: "",
        pet_skill3: ""
    })

    const [errors, setErrors] = useState([])
    const [objList, setObjList] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/api/pets/all')
            .then(res => setObjList(res.data.results))
            .catch(err => console.log("Error: ", err))
    }, [])
    console.log(objList)
    const namePets = objList.map(p => p.pet_name)
    // console.log(namePets)


    const changeHandler = (e)=>{
        console.log("change")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }
    console.log(namePets)
    const submitHandler = (e) => {
        e.preventDefault()
        if(namePets.includes(formInfo.pet_name) === false){
            axios.post('http://localhost:8000/api/pets/create', {formInfo})
                .then(response=>{navigate('/')})
            .catch(err=> {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
        }
        else {
            errors.push("Name is already taken")
            navigate('/api/pets/create')
        }
    }


    return (
        <div>
            <h2>Know a pet needing a home?</h2>
            <form onSubmit = {submitHandler} className="col-6 mx-auto">
                {errors.map((err,index)=> <p key={index}>{err}</p>)}
                <div className="form-group">
                    <label htmlFor="">Pet Name: </label>
                    <input type="text" name="pet_name" id="" className="form-control" onChange= {changeHandler} />
                    <p className="text-danger">{errors.pet_name? errors.pet_name.message: ""}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Type: </label>
                    <input type="text" name="pet_type" id="" className="form-control" onChange= {changeHandler} />
                    <p className="text-danger">{errors.pet_type? errors.pet_type.message: ""}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Description: </label>
                    <input type="text" name="pet_desc" id="" className="form-control" onChange= {changeHandler} />
                    <p className="text-danger">{errors.pet_desc? errors.pet_desc.message: ""}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Skills: (optional)</label>
                    <input type="text" name="pet_skill_1" id="" className="form-control" onChange= {changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Skills: (optional)</label>
                    <input type="text" name="pet_skill_2" id="" className="form-control" onChange= {changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Skills: (optional)</label>
                    <input type="text" name="pet_skill_3" id="" className="form-control" onChange= {changeHandler} />
                </div>
                <input type="submit" value="Add Pet"/>
            </form>
        </div>
    );
};


export default NewForm;