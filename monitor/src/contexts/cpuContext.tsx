import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { createContext, useEffect, useState } from "react";
import Cpu from "../models/cpu";
import CpuUsage from "../models/cpuUsage";
import { getData } from "../utils/fetch";

export interface iCpuContext {
  cpu: Cpu;
  setCpu: React.Dispatch<React.SetStateAction<Cpu>>;
  percentages: CpuUsage[];
  setPercentages: React.Dispatch<React.SetStateAction<CpuUsage[]>>;
  hub: HubConnectionBuilder;
  getCpuInfo: () => void;
}

const CpuContext = createContext({} as iCpuContext);
const url: string | undefined = process.env.REACT_APP_API;
export interface iCpuProvider {
  children: React.ReactNode;
}

function CpuProvider({ children }: iCpuProvider) {
  const [cpu, setCpu] = useState<Cpu>({} as Cpu);
  const [percentages, setPercentages] = useState<CpuUsage[]>([]);
  const [hub, setHub] = useState<any>();

  useEffect(() => {
    async function createHub() {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl(url!! + "/cpu")
          .configureLogging(LogLevel.Trace)
          .build();

        await connection
          .start()
          .then(() => {
            connection.on("ReceiveData", (data: any) => {
              console.log(data);

              const apiData: CpuUsage = {
                Percentage: data?.percentage,
                Time: JSON.parse(data?.time),
              };

              if (apiData.Time && apiData.Percentage) {
                setPercentages((prevPercentages) => [
                  ...prevPercentages,
                  apiData,
                ]);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
        setHub(connection);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    createHub();

    return () => {
      if (hub) {
        hub.stop();
      }
      setHub(null);
      setCpu({} as Cpu);
      setPercentages([]);
    };
    // eslint-disable-next-line
  }, []);

  const getCpuInfo = async () => {
    const ret = await getData("/Cpu/getCpu");
    const apiData: Cpu = {
      Name: ret?.Name,
      CoreCount: ret?.CoreCount,
    };

    setCpu(apiData);
  };

  return (
    <CpuContext.Provider
      value={{ cpu, setCpu, percentages, setPercentages, hub, getCpuInfo }}
    >
      {children}
    </CpuContext.Provider>
  );
}

export { CpuContext, CpuProvider };
