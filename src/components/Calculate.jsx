import React, { useState } from 'react';
import { Select, Option, Input } from "@material-tailwind/react";
import { data } from '../data';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const Calculate = () => {
    const [selectedSemester, setSelectedSemester] = useState("default");
    const [marks, setMarks] = useState({});
    const [sgpa, setSgpa] = useState(0);
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState(true);


    const getValue = (value) => {
        setSelectedSemester(value);
        setMarks({}); // Clear marks when the semester is changed
        setSgpa(0)
    }


    const handleOpen = () => setOpen(!open);
    const handleInfo = () => setInfo(!info);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value >= 0 && value <= 100) {
            setMarks((prev) => ({
                ...prev,
                [name]: parseInt(value),
            }));
        } else {
            alert("Invalid Marks");
            e.target.value = "";
        }
    };

    const calculate = () => {
        let totalCredits = 0;
        let totalMarks = 0
        for (const key in marks) {
            totalMarks += marks[key] * findCreditsByCourseCode(key)
            totalCredits += findCreditsByCourseCode(key)
        }
    var tempSgpa=(totalMarks / totalCredits) / 10
        if(tempSgpa>=0){
            setSgpa(tempSgpa)
        }
        console.log(sgpa)
        setOpen(!open);
    }


    const findCreditsByCourseCode = (courseCode) => {
        const course = data[selectedSemester].find((item) => item.courseCode === courseCode);
        return course ? course.credits : 0;
    };

    return (
        <div className='bg-[#02080d] my-5 w-[350px] md:w-[750px] p-5 rounded flex flex-col gap-4'>
            <h1 className='text-lg font-semibold text-center'>Calculate your SGPA 2021 scheme<p className='text-sm text-center text-gray-800 font-light'>*currently available only for CSE branch...</p></h1>

            <div className='sems flex flex-col md:flex-row items-center justify-center gap-5 flex-wrap w-[100%]'>
                <div className=''>
                    <Select color='blue' label="Choose semester" className='font-semibold text-white ' onChange={(e) => getValue(e)}>
                        <Option value='sem 3'>Semester 3</Option>
                        <Option value='sem 4'>Semester 4</Option>
                    </Select>
                </div>

                <div className=''>
                    <Select color='blue' label="CSE" disabled className='font-semibold text-white ' onChange={(e) => getValue(e)}>
                        <Option >CSE</Option>

                    </Select>
                </div>
            </div>
            <div className='inputs flex flex-col gap-5 p-5'>
                <p>Enter the subject marks</p>
                {data[selectedSemester].map((item) => (

                    <div className='min-w-min flex flex-col gap-3 ' key={item.courseCode}>
                        <label className='text-sm text-[#858585]'>{item.courseName}</label>
                        <Input className='text-white' label={item.courseCode} color='purple' name={item.courseCode} type='number' onChange={(e) => { handleChange(e) }} />

                    </div>
                ))}
            </div>
            <button className='bg-[#64519a] p-5 rounded-lg text-2xl text-center' onClick={calculate}>
                Calculate
            </button>


            <Dialog open={open} handler={handleOpen} size='xs' className='bg-[#ffffff] w-[300px] font-[poppins]  border-2 text-center border-[#64519a]'>
                <DialogHeader className='flex items-center justify-between font-[poppins]'>Result<Button onClick={handleOpen} className='bg-red-500 px-4 rounded-md py-2 font-[poppins]'>X</Button></DialogHeader>
                <DialogBody className='text-center text-3xl font-[poppins] font-bold '>
                    Your SGPA is {sgpa.toFixed(2)}
                </DialogBody>
            </Dialog>

            <Dialog open={info} handler={handleInfo} size='xs' className='bg-[#02080d] w-[300px] font-[poppins]  border-2 text-center border-[#64519a]'>
                <DialogHeader className='flex items-center justify-between font-[poppins] text-gray-500'>Information<Button onClick={handleInfo} className='bg-red-500 px-4 rounded-md py-2 font-[poppins]'>X</Button></DialogHeader>
                <DialogBody className='text-center text-lg font-[poppins] font-bold text-white '>
                    If you have not written the exam , leave it blank.
                </DialogBody>
            </Dialog>
        </div>
    )
}

export default Calculate;
