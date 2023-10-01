import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "./App.css";
import Loading from "./components/loading";
import Monitor from "./components/monitor";
import useCpu from "./hooks/useCpu";

function App() {
  const { hub, getCpuInfo } = useCpu();

  useEffect(() => {
    const obtainData = async () => {
      await getCpuInfo();
    };
    obtainData();
    // eslint-disable-next-line
  }, []);

  return <div>{!hub ? <Loading /> : <Monitor></Monitor>}</div>;
}

export default App;
