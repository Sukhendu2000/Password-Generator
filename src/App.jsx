import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8); // for tracking the length of password
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(""); // initially password is null

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // if user checks the number
    if (numberAllowed) {
      str += "0123456789";
    }
    // if user checks the character
    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }
    // for picking random passwords on basis of password length
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      //here I used charAt because after itration the char variable stores the character's index number not actual character.
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  
  // This function handles multiple functions when button is clicked
  const handleButtonClick = (e) => {
    copyPasswordToClipBoard(e);
    copiedMsg();
  };

  // this function shows copied MSG
  const copiedMsg = useCallback(()=>{
      // Change the inner HTML of the button to 'Copied'
      const btn = document.getElementById('btn');
      if (btn) {
        btn.innerHTML = 'Copied';
        btn.style.color = 'red';
        btn.style.backgroundColor = 'lightblue';

        // Reset the button text after a certain delay (e.g., 2 seconds)
        setTimeout(() => {
          btn.innerHTML = 'Copy';
          btn.style.color = ''; // Reset to default color
          btn.style.backgroundColor = '';
        }, 1000);
      }
  }, [password])

  // copyPasswordToClipBoard function copies the password
  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select(); // it shows that the password is selected from clipboard
    passwordRef.current?.setSelectionRange(0, 49); // here i'm giving the range, only that part is selected
    window.navigator.clipboard.writeText(password);
  }, [password])
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div id="container">
        <h1>Password Generator</h1>
        <div id="input-button">
          <input
            id="input-box"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button id="btn" onClick={handleButtonClick}>Copy</button>
        </div>
        <div id="check-boxes">
          <div id="check-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>
              Length: <span id="length">{length}</span>
            </label>
          </div>
          <div id="check-2">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div id="check-3">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
