import { useState } from "react";
import "./App.css";
import ParticleCanvas from "./ParticicleCanvas"; // Fixed typo

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open ? ( // Show button first, then ParticleCanvas after click
        <button className="gender" onClick={() => setOpen(true)}>
          <span className="kapuyt">Boy</span> Or{" "}
          <span className="rozvi">Girl</span>
        </button>
      ) : (
        <ParticleCanvas />
      )}
    </>
  );
}

export default App;
