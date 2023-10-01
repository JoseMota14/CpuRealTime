using CpuServer.Models;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Threading;
using System.Text.RegularExpressions;

namespace CpuServer.Services
{
    public class CpuService : ICpuService
    {
        private const string COMMAND = "wmic cpu get loadpercentage";

        public async Task<Cpu> GetCpuInfo()
        {
            int coreCount = Environment.ProcessorCount;

            await Task.Delay(5);

            return new Cpu("Cpu teste", coreCount); 
        }

        public CpuUsage GetCpuUsage()
        {
            try
            {
                using (Process process = new Process())
                {
                    process.StartInfo.FileName = "cmd.exe";
                    process.StartInfo.Arguments = $"/C {COMMAND}"; // /C flag to run the command and terminate
                    process.StartInfo.UseShellExecute = false;
                    process.StartInfo.RedirectStandardOutput = true;

                    process.Start();
                    string result = process.StandardOutput.ReadToEnd();
                    process.WaitForExit();

                    string pattern = @"\d+";
                    Match match = Regex.Match(result, pattern);
                    if (match.Success)
                    {
                        // Extract the matched number as a string
                        string numberString = match.Value;
                        double.TryParse(numberString, out double doubleValue);
                        return new CpuUsage(doubleValue);
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex.Message}");
            }
        }
    }
}
