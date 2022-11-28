import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { apiDomain } from '../../config'

const NoteDelete = ({ displayMessage }) => {

  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('rdrf-token')

  const handleDelete = (e) => {
    e.preventDefault()
    
    axios({
      method: 'DELETE',
      url: `${apiDomain}/api/note/${id}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
      },
    }).then((response) => {
        displayMessage('Note deleted successfully.', 'success')
        navigate('/')
    })
    .catch((error) => {
        // console.log(error)
        displayMessage('Something went wrong.', 'danger')
    }) 
  }

  return (
    <div className='content-section'>
      <p className='border-bottom pb-4'>Are you sure, You want to delete this note?</p>
      <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
      <Link to={{ pathname: `/noteUpdate/${id}` }} className='btn btn-secondary mx-2'>Cancel</Link>
    </div>
  )
}

export default NoteDelete