import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UsersOnlineSingleProfile from './UsersOnlineSingleProfile'
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

 const UsersOnlineDisplay = () => {
  const dispatch = useDispatch();
  const listOfUsersOnline = useSelector((state) => state.messages.listOfUsersOnline);
  const currUser = useSelector((state) => state.messages.currUser);
  const usersOnline = useSelector((state) => state.messages.usersOnline);

  useEffect(() => {
    socket.on('add user to state', (data) => {
      console.log('new user joined!', data);
      dispatch({ type: 'NEW_USER', payload: data})
    })

    socket.on('all user data', (data) => {
      console.log('loading all websocket user data')
      dispatch({type: 'BUILD_USER_DATA', payload: data})
    })


  }, [])

  const userList = Object.entries(listOfUsersOnline).map(([ key, value ]) => {
    // if (username === currUser) return;
    console.log('user in list:', key)
    return <UsersOnlineSingleProfile  username={key}/>
  })

  return (
    <div>
      <h4> Users Currently Online: {usersOnline}</h4>
      <ul>
        {userList}
      </ul>
    </div>
  )
}

export default UsersOnlineDisplay;