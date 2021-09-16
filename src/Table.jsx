import React from 'react'
import './Table.css'

function Table({countries}) {
    return (
        <div className="table">
            <tr>
                <td> <strong>Countries</strong> </td>
                <td><strong>Cases</strong></td>
                <td><strong>Active</strong></td>
            </tr>
            {countries.map(({country,cases, active}) => (
                <tr>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                    <td><strong>{active}</strong></td>
                </tr>
            ))}

            
        </div>
    )
}

export default Table
