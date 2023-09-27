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
          .withUrl("https://localhost:44398/cpu")
          .configureLogging(LogLevel.Information)
          .build();

        await connection
          .start()
          .then(() => {
            connection.on("ReceiveData", (data: CpuUsage) => {
              console.log(
                "Connected to streaming hub." + data.Time + data.Percentage
              );
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
      setHub(null);
      setCpu({} as Cpu);
      setPercentages([]);
    };
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
