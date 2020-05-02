import React from 'react'

// Components
import UsersList from './../components/UsersList'

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Dwayne Johnson',
      image:
        'https://www.sheknows.com/wp-content/uploads/2020/05/Dwayne-Johnson-sings-moana.jpg?resize=695,391',
      places: 3
    },
    {
      id: 'u2',
      name: 'Robert Downey Jr.',
      image:
        'https://www.sheknows.com/wp-content/uploads/2020/04/hugh-jackman-1.jpg?resize=695,391',
      places: 4
    },
    {
      id: 'u3',
      name: 'Chris Pratt',
      image:
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?w968h681',
      places: 6
    }
  ]

  return <UsersList items={USERS} />
}

export default Users
