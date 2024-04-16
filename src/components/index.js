import React, { useState } from 'react'
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../src/data';

function Dashboard() {

    const [employees, setEmployees] = useState(employeesData);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
