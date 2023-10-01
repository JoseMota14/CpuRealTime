export default interface CpuUsage {
  Time: TimeComponents;
  Percentage: number;
}

interface TimeComponents {
  Hour: number;
  Minute: number;
  Second: number;
}
