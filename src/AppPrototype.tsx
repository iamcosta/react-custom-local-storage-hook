import React, { useState } from 'react';
import { useLocalStoragePrototype } from './hooks/use-local-storage-prototype';
import './App.css';

interface UserModel {
  name: string;
  lastname: string;
  age: string;
}

interface ParentsModel {
  motherName: string;
  fatherName: string;
}

const App: React.FC = () => {
  const storageUser = useLocalStoragePrototype<UserModel>('user');
  const storageParents = useLocalStoragePrototype('parents')

  const [user, setUser] = useState<UserModel>({
    name: storageUser.item ? storageUser.item.name : '',
    lastname: storageUser.item ? storageUser.item.lastname : '',
    age: storageUser.item ? storageUser.item.age : ''
  });

  const [parents, setParents] = useState<ParentsModel>({
    motherName: storageParents.item ? storageParents.item.motherName : '',
    fatherName: storageParents.item ? storageParents.item.fatherName : '',
  });

  const getInputNameValue = (event: any) => ({
    inputName : event.target.getAttribute('name'),
    inputValue : event.target.value,
  })

  function handleChangeUserForm(event: any) {
    const { inputName, inputValue  } = getInputNameValue(event);
    setUser(prev => ({
      ...prev,
      [inputName]: inputValue
    }));
  }

  function handleChangeParentsForm(event: any) {
    const { inputName, inputValue  } = getInputNameValue(event);
    setParents(prev => ({
      ...prev,
      [inputName]: inputValue
    }));
  }

  function handleSubmitUser(event: any) {
    event.preventDefault();
    storageUser.setItem(user);
  }

  function handleSubmitParents(event: any) {
    event.preventDefault();
    storageParents.setItem(parents);
  }

  return (
    <div>
      <fieldset>
        <label>User Form</label>
        <hr />
        <form className="app-form" onSubmit={handleSubmitUser}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChangeUserForm}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChangeUserForm}
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChangeUserForm}
          />
          <button type="submit">Submit</button>
        </form>
      </fieldset>
      <fieldset>
        <label>Parent Form</label>
        <hr />
        <form className="app-form" onSubmit={handleSubmitParents}>
          <label htmlFor="motherName">Mother Name</label>
          <input
            type="text"
            name="motherName"
            value={parents.motherName}
            onChange={handleChangeParentsForm}
          />
          <label htmlFor="fatherName">Father Name</label>
          <input
            type="text"
            name="fatherName"
            value={parents.fatherName}
            onChange={handleChangeParentsForm}
          />
          <button type="submit">Submit</button>
        </form>
      </fieldset>
      <fieldset>
        <label>LocalStorage Data</label>
        <hr />
        <p>
          user: {JSON.stringify(storageUser.item)}
        </p>
        <p>
          parents: {JSON.stringify(storageParents.item)}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button type="button" onClick={storageUser.removeItem}>Remove user</button>
          <button type="button" onClick={storageParents.removeItem}>Remove parents</button>
          <button type="button" onClick={storageParents.clearStorage}>Clear Storage</button>
        </div>
      </fieldset>
    </div>
  );
};

export default App;
