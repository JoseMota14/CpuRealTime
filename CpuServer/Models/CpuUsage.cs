using System.Text.Json;
using System.Text.Json.Serialization;
using System;

namespace CpuServer.Models
{
    public class CpuUsage
    {
        public double Percentage { get; set; }
        public string Time { get; set; }

        public CpuUsage(double percentage)
        {
            Percentage = percentage;

            var timeComponents = new
            {
                DateTime.Now.Hour,
                DateTime.Now.Minute,
                DateTime.Now.Second
            };

            Time = JsonSerializer.Serialize(timeComponents);
        }

    }
}
