import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router';
import { UsersApi } from '../features/users/userApi';
import { useAppDispatch } from '../app/hooks';
import { setTeam } from '../features/auth/authSlice';
import { LocalStorageManager } from '../utils/localStorageManagement';

function Recruiting() {
    const params = useParams<{ id: string }>();
    const [password, setPassword] = useState<string>('');
    const [correctPassword, setCorrectPassword] = useState(false);
    const dispatch = useAppDispatch();

    const handleKeyPress = (e: KeyboardEvent) => {
        //console.log(e.key);
        setPassword(curPassword => {
            const fullString = curPassword+e.key;
            return fullString.slice(-8);
        })
    }


    useEffect(() => {
        if(password.length == 8 && params.id)
            UsersApi.joinTeam(params.id, password)
            .then((response) => {
                if(response.data.msg == 'Joined'){
                    setCorrectPassword(true);
                    dispatch(setTeam(params.id ?? ''))
                    LocalStorageManager.put<string>('team', params.id?.toLowerCase() ?? '')
                }
            })
    })

    useEffect(()=>{
        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
        }
    })
  return (
    <Container>
        {correctPassword && <h1>welcome</h1>}
    </Container>
  )
}

export default Recruiting