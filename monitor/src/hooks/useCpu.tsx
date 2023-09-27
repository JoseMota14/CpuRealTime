import { useContext } from "react";
import { CpuContext } from "../contexts/cpuContext";

export default function useCpu() {
  const context = useContext(CpuContext);

  return context;
}
