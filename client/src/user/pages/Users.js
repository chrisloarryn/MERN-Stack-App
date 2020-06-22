import React, { useEffect, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import UsersList from '../components/UsersList';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedUsers, setLoadedUsers] = useState([])

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/v1/users`)
        const responseData = await response.json()

        if (!responseData.message) throw new Error(responseData.message)

        setLoadedUsers(responseData.users)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setError(err.message)
      }
    }
    sendRequest()
  }, [])

  const errorHandler = () => setError(null)

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      {isLoading && (
        <LoadingSpinner />
      )}
      <UsersList items={loadedUsers} />;  
    </React.Fragment>
  ) 
};

export default Users;
