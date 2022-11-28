import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { userContext } from '../App'
import { apiDomain } from '../config'


const Home = () => {

  const user = useContext(userContext)
  const [notes, setNotes] = useState([])
  const [visibleNotes, setVisibleNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    const filteredNotes = notes.filter((note) => {
      return note.title.includes(searchQuery) || note.body.includes(searchQuery)
    })

    setVisibleNotes(filteredNotes)
  }

  useEffect(() => {
    const token = localStorage.getItem('rdrf-token')
    
    axios({
            method: 'get',
            url: `${apiDomain}/api/notes/`,
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then((response) => {
            // console.log(response)
            // console.log(response.data)
            setNotes(response.data)
            setVisibleNotes(response.data)
        })
        .catch((error) => {
            // console.log(error)
            // console.log(error.response.data)
        })
  }, [])


  if (!user.email) {
    return <div className='content-section'>
      <p className="my-0">Try creating your account if you are new here. <Link to='/register'><strong>Register</strong></Link></p>
      <p className="my-0">If you already have an account. Login to view your notes. <Link to='/login'><strong>Login</strong></Link></p>
    </div>
  } else {
    return (
      <div className='content-section'>
        <div className='d-flex my-2 pb-2 border-bottom'>
          <Link to='/noteCreate' className='btn btn-outline-info mx-2'>Add New Note</Link>
          <form method='post' onSubmit={handleSearchSubmit}>
            <input type='text' placeholder='Search Notes' onChange={(e) => setSearchQuery(e.target.value)}></input>
          </form>
        </div>
        <Link to='/'><h3 className='my-4 pb-1 border-bottom'>Notes</h3></Link>
        {
          notes.length <= 0 ? 
          <p className="my-0">Seems like you do not have any note. Try creating one. <Link to='/'><strong>Add Note</strong></Link></p> :
          <div>
            {visibleNotes.map((note) => (
              <div className='border border-shadow-sm my-2 rounded' key={note.id}>
                  <Link to={{ pathname: `/noteUpdate/${note.id}` }}><p className='m-2'>{note.title}</p></Link>
                  <Link to={{ pathname: `/noteUpdate/${note.id}` }}><p className='m-2'>{note.body}</p></Link>
                </div>
            ))}
          </div>
        }
      </div>
    )
  }
}

export default Home