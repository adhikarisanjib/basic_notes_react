import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { apiDomain } from '../../config'

const NoteUpdate = ({ displayMessage }) => {

    const [note, setNote] = useState({})
    const [noteTitle, setNoteTitle] = useState('')
    const [noteBody, setNoteBody] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()
    const token = localStorage.getItem('rdrf-token')

    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'put',
            url: `${apiDomain}/api/note/${id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                'title': noteTitle,
                'body': noteBody,
            }
        }).then((response) => {
            displayMessage('Note updated successfully.', 'success')
            navigate('/')
        })
        .catch((error) => {
            console.log(error)
            displayMessage('Something went wrong.', 'danger')
        }) 
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: `${apiDomain}/api/note/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then((response) => {
            // console.log(response)
            // console.log(response.data)
            setNote(response.data)
            setNoteTitle(response.data.title)
            setNoteBody(response.data.body)
        })
        .catch((error) => {
            // console.log(error)
            console.log(error.response.data)
        })
    }, [])

  return (
    <div className='content-section'>
        <form method='post' onSubmit={handleSubmit}>
        <legend className='border-bottom mb-2 pb-2'>Update Note</legend>
        <div className='form-element'>
            <label htmlFor='id_title_input'>Title</label>
            <input id='id_title_input' type='text' className='form-control' value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
        </div>
        <div className='form-element'>
            <label htmlFor='id_body_input'>Body</label>
            <textarea id='id_body_input' className='form-control' rows={10} value={noteBody} onChange={(e) => setNoteBody(e.target.value)} ></textarea>
        </div>
        <div className='border-top py-2'>
        <button type='submit' className='btn btn-outline-info'>Update</button>
        <Link to={{ pathname:`/noteDelete/${note.id}` }} className='btn btn-danger mx-2'>Delete</Link>
        </div>
        </form>
    </div>
  )
}

export default NoteUpdate