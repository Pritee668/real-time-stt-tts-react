// HomeContent.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
    {/* <NavBar/> */}
    <main>
      <div className="upperContainer">
        <p className="para">Welcome to Our Project</p>
        <div className="containerH">
          {/* Links to the Text-to-Speech and Speech-to-Text pages */}
          <Link to="/text-to-speech">
            <Button label="Text to Speech" />
          </Link>
          <Link to="/speech-to-text">
            <Button label="Speech to Text" />
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}


function Button({ label }) {
  return <button>{label}</button>;
}


export default Home;
