import React, { useState } from 'react';
import { useLocalStorage } from '..';
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

interface StorageModel {
    user: UserModel;
    parents: ParentsModel;
}

const App: React.FC = () => {
    const storage = useLocalStorage<StorageModel>({
        baseName: "@app-storage",
        initialData: {
            user: {
                name: "",
                lastname: "",
                age: ""
            },
            parents: {
                motherName: "",
                fatherName: ""
            }
        }
    });

    const [user, setUser] = useState<UserModel>({
        name: storage.data && storage.data.user ? storage.data.user.name : '',
        lastname: storage.data && storage.data.user ? storage.data.user.lastname : '',
        age: storage.data && storage.data.user ? storage.data.user.age : ''
    });

    const [parents, setParents] = useState<ParentsModel>({
        motherName: storage.data && storage.data.parents ? storage.data.parents.motherName : '',
        fatherName: storage.data && storage.data.parents ? storage.data.parents.fatherName : '',
    });

    const getInputNameValue = (event: any) => ({
        inputName: event.target.getAttribute('name'),
        inputValue: event.target.value,
    })

    function handleChangeUserForm(event: any) {
        const { inputName, inputValue } = getInputNameValue(event);
        setUser(prev => ({
            ...prev,
            [inputName]: inputValue
        }));
    }

    function handleChangeParentsForm(event: any) {
        const { inputName, inputValue } = getInputNameValue(event);
        setParents(prev => ({
            ...prev,
            [inputName]: inputValue
        }));
    }

    function handleSubmitUser(event: any) {
        event.preventDefault();
        storage.setItem('user', user);
    }

    function handleSubmitParents(event: any) {
        event.preventDefault();
        storage.setItem('parents', parents);
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
                    user: {JSON.stringify(storage.data ? storage.data.user : null)}
                </p>
                <p>
                    parents: {JSON.stringify(storage.data ? storage.data.parents : null)}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button type="button" onClick={() => storage.removeItem('user')}>Remove user</button>
                    <button type="button" onClick={() => storage.removeItem('parents')}>Remove parents</button>
                    <button type="button" onClick={storage.clearStorage}>Clear Storage</button>
                </div>
            </fieldset>
        </div>
    );
};

export default App;
