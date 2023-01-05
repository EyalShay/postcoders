import { useEffect, useState } from "react";
import { getAreaData } from "./api";

import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [postCode, setPostcode] = useState("BB10");

  const load = async () => {
    try {
      const areaData = await getAreaData(postCode);

      areas.concat(areaData);

      setAreas(areaData);
    } catch (error) {
      window.alert(
        "Please insert the outcode of a valid GB postcode (e.g. “M1” for “M1 7ED”)"
      );
      console.log(error, "error message");
    }
  };

  const handleChange = (e) => {
    setPostcode(e.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    load(postCode);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <h2>{`Areas for ${postCode}: ${areas.length}`}</h2>
      <input
        type="text"
        placeholder="Insert Postcode"
        onChange={handleChange}
        maxLength={4}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
