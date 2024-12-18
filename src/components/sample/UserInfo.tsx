import React from 'react'

const UserInfo = ({user}: any | null) => {
 const { name, age, country, books} = user || {}
  return (
    <div>
      <p> Name: {name} </p>
      <p> Age: {age} </p>
      <p> Country: {country} </p>
      <p>
        Books:
        <ul>
          {books?.map((book: any, index: any) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </p>
    </div>
  )
}

export default UserInfo