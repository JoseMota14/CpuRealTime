using System;

namespace CpuServer.Models
{
    public class CpuUsage
    {
        public double Percentage { get; set; }
        public DateTime Time { get; set; }

        public CpuUsage(double percentage)
        {
            Percentage = percentage;
            Time = DateTime.Now;
        }

    }
}
