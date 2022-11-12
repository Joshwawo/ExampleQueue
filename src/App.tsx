import { useEffect, useState } from "react";

import { LineWobble } from "@uiball/loaders";

import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState<any>(null);
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  let counter = 0;

  const fetchData = async () => {
    try {
      let cnt = counter++;

      setLoading(true);
      const start = Date.now();
      const startParse = new Date(start);
      console.log("start", cnt, start);
      // console.log("start", startParse);
      setStart(startParse.toLocaleTimeString());

      const url =
        "https://example-queueinexpress-production.up.railway.app/test1";
      const response = await axios.get(url);

      setData(response.data);
      const end = Date.now();
      const endParse = new Date(end);
      setEnd(endParse.toLocaleTimeString());
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
    // console.log(response);
  };

  useEffect(() => {
    fetchData() 
  }, []);

  // console.log(data && data.test);
  console.log(start);

  const handleOpenWindow = () => {
    windows();
    windows();
    windows();
  };

  const windows = () => {
    window.open("https://example-queue.vercel.app");
  };
  console.log(data);

  return (
    <div className="App">
      <br />
      <button onClick={handleOpenWindow}>Abrir pestañas</button>
      <br />
      {start && (
        <p style={{ color: "green" }}>La peticion incio a las {start}</p>
      )}
      <br />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <LineWobble size={80} lineWeight={5} speed={2} color="white" />
        </div>
      ) : (
        data && <span>{data.message}</span>
      )}
      <br />
      {end && (
        <p style={{ color: "yellowgreen" }}>La peticion termino a las {end}</p>
      )}
      <br />
      {error && <p style={{ color: "red" }}>ooof: {error}</p>}

      <button onClick={fetchData}>Hacer otra peticion</button>
    </div>
  );
}

export default App;
