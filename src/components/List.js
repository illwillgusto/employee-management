import React from 'react'

function List({ employees, handleEdit, handleDelete }) {
  return (
    <div className='contain-table'>
      <table className='striped-table'>
  <thead>
    <tr>
      <th>No.</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Salary</th>
      <th>Start Date</th>
      <th colSpan={2} className='text-center'>Actions</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th>Footer 1</th>
      <th>Footer 2</th>
      <th>Footer 3</th>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
    <tr>
      <td>Description 1</td>
      <td>Description 2</td>
      <td>Description 3</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default List
