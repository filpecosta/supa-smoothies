import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseConfigClient'

export default function SmoothieCard({ smoothie, onDelete }) {

  const navigate = useNavigate()

  const date = new Date(smoothie.created_at)

  async function handleDelete() {
    const response = window.confirm('Are you sure you want to delete this smoothie?')
    if (response) {
      // delete smoothie

      const { data, error } = await supabase
        .from('smoothies')
        .delete()
        .eq('id', smoothie.id)
        .select()

      if (error) {
        console.log(error)
        alert('Could not delete smoothie')
      }

      if (data) {
        // alert('Smoothie deleted')
        console.log(data)
        onDelete(smoothie.id)
        // window.location.reload()
      }
    }
  }
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className='rating'>
        {smoothie.rating}
      </div>
      <div>{date.toLocaleDateString('en-us')}</div>
      <div className='buttons'>
        <Link to={'/' + smoothie.id} >
          <i className='material-icons'>edit</i>
        </Link>
        <i className='material-icons' onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}
