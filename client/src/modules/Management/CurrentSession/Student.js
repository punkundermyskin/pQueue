import React, { useContext } from 'react'

export const Student = ({ student }) => {

    return (
        <li>
            {student.username}<button>x</button>
        </li>
    )
}
