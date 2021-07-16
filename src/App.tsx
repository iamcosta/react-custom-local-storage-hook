import React, { useState } from 'react';
import { useLocalStorage } from '../';
import './App.css';

interface userModel {
  name: string;
  lastname: string;
  age: string;
}

const App: React.FC = () => {
  const storage = useLocalStorage<userModel>('user');

  const [user, setUser] = useState<userModel>({
    name: storage.item ? storage.item.name : '',
    lastname: storage.item ? storage.item.lastname : '',
    age: storage.item ? storage.item.age : ''
  });

  function handleChange(event: any) {
    const inputName = event.target.getAttribute('name');
    const inputValue = event.target.value;
    setUser(prev => ({
      ...prev,
      [inputName]: inputValue
    }));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    storage.setItem(user);
  }

  return (
    <div>
      <fieldset>
        <label>User Form</label>
        <hr />
        <form className="app-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </fieldset>
      <fieldset>
        <label>LocalStorage Data</label>
        <hr />
        <p>
          @yourAppName/user: {JSON.stringify(storage.item)}
        </p>
        <button type="button" onClick={storage.clearStorage}>Clear Storage</button>
      </fieldset>
    </div>
  );
};

export default App;
