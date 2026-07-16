import React from 'react'

export const ChargeTable = () => {
  return (
    <>
    <table className='table table-striped' >
        <thead>
          <th></th>
          <th> Equity delivery  </th>
          <th> Equity intraday</th>
        </thead>
        <tbody>
         <tr>
          <td>Brokerage</td>
          <td>{}</td>
          <td>{}</td>
         </tr>
         <tr>
          <td>STT/CTT</td>
          <td>{}</td>
          <td>{}</td>
         </tr>
         <tr>
          <td>Transaction charge</td>
          <td>{}</td>
          <td>{}</td>
         </tr>
         <tr>
          <td>GST</td>
          <td>{}</td>
          <td>{}</td>
         </tr>
         <tr>
          <td>SEBI charges</td>
          <td>{}</td>
          <td>{}</td>
         </tr>
         <tr>
          <td>Stamp charges</td>
          <td>{}</td>
          <td>{}</td>
         </tr>
        </tbody>
    </table>
    </>
  )
}
