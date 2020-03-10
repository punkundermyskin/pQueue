import React, { useContext } from 'react'
// import { SessionsContext } from '../context/GlobalState'

export const Session = ({ session }) => {
    // const { deleteTransaction } = useContext(GlobalContext);

    // const sign = transaction.amount < 0 ? '-' : '+';

    return (
        <li>
            {session.subject} <button onClick={() => console.log(session._id)}>x</button>
        </li>
    )
}
