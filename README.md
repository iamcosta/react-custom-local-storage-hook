# `react-custom-local-storage-hook`

> Performe localStorage persistence returning state as a feedback helper for components.

## Installation

You can install it with:

```
npm install react-custom-local-storage-hook

// or

yarn add react-custom-local-storage-hook
```

## Import

```js
import { useLocalStorage } from 'react-custom-local-storage-hook';
```

## Usage

```js
const storageData = useLocalStorage("@yourLocalStorage/key");
```

Now, `storageData` has:

- `item`: the data stored in the provided key (this is a state, so you can manager component rendering whenever it changes);
- `setItem`: the data storage function in the provided key;
- `removeItem`: the function of removing data from the provided key;
- `clearStorage`: the function that CLEARS THE ENTIRE (KEEP IT IN MIND) localStorage of your app.

## Examples
#### `storageData.setItem(data)`
```js
const user: {
    name: "Iam",
    lastName: "Costa",
    age: "24"
}

storageData.setItem(user);
// storageData.item = { name: "Iam", lastName: "Costa", age: "24" }
```

#### `storageData.removeItem()`
```js
storageData.removeItem();
// storageData.item = null
```

#### `storageData.clearStorage()`
```js
storageData.clearStorage();
// storageData.item = null
/* any other key previously provided will return null because 
all of your app's localStorage has been cleared, so be careful */
```
## Take a look

Clone this repository:
```
git clone https://github.com/iamcosta/react-custom-local-storage-hook.git
```
Run:
```
npm run start

//or 

yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Send me feedback
This is my first package and I'm trying to put all my love on it <3

## License

MIT @ Iam Barroso da Costa
