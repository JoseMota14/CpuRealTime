using CpuServer.Models;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace CpuServer.Services
{
    public class CpuService : ICpuService
    {
        public async Task<Cpu> GetCpuInfo()
        {
            int coreCount = Environment.ProcessorCount;

            await Task.Delay(5);

            return new Cpu("Cpu teste", coreCount); 
        }

        public CpuUsage GetCpuUsage()
        {
            // Get the current process
            Process currentProcess = Process.GetCurrentProcess();
            // Get the CPU usage for the process
            double cpuUsage = 0.0;

            if (currentProcess != null)
            {
                cpuUsage = currentProcess.TotalProcessorTime.TotalMilliseconds /
                           (Environment.ProcessorCount * currentProcess.TotalProcessorTime.TotalMilliseconds);
            }

            return new CpuUsage(cpuUsage * 100); // Convert to percentage
        }
    }
}
