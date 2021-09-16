import React from 'react'
import './Table.css'
import numeral from "numeral";

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
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                    <td><strong>{numeral(active).format("0,0")}</strong></td>
                </tr>
            ))}

            
        </div>
    )
}

export default Table
