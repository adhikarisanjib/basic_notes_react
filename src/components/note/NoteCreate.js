import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { apiDomain } from '../../config'


const NoteCreate = ({ displayMessage }) => {

    const [noteTitle, setNoteTitle] = useState('')
    const [noteBody, setNoteBody] = useState('')

    const navigate = useNavigate()
    const token = localStorage.getItem('rdrf-token')

    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        axios({
            method: 'post',
            url: `${apiDomain}/api/notes/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                'title': noteTitle,
                'body': noteBody,
            }
        }).then((response) => {
            displayMessage('Note created successfully.', 'success')
            navigate('/')
        })
        .catch((error) => {
            // console.log(error)
            displayMessage('Something went wrong.', 'danger')
        }) 
    }

  return (
    <div className='content-section'>
        <form method='POST' onSubmit={handleSubmit}>
        <legend className='border-bottom mb-2 pb-2'>Add Note</legend>
        <div className='form-element'>
            <label htmlFor='id_title_input'>Title</label>
            <input id='id_title_input' type='text' className='form-control' onChange={(e) => setNoteTitle(e.target.value)} />
        </div>
        <div className='form-element border-bottom'>
            <label htmlFor='id_body_input'>Body</label>
            <textarea id='id_body_input' className='form-control' rows={10} onChange={(e) => setNoteBody(e.target.value)} ></textarea>
        </div>
        <button type='submit' className='btn btn-outline-info mt-2'>Add</button>
        </form>
    </div>
  )
}

export default NoteCreate