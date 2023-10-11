using System.Timers;
using System;
using CpuServer.Models;

namespace CpuServer.Performance
{
    public class CleanUpStore
    {
        private Timer timer;

        public CleanUpStore()
        {
            timer = new Timer(TimeSpan.FromHours(1).TotalMilliseconds); // Run every hour
            timer.Elapsed += TimerElapsed;
        }

        public void Start()
        {
            timer.Start();
        }

        public void Stop()
        {
            timer.Stop();
        }

        private void TimerElapsed(object sender, ElapsedEventArgs e)
        {
            Cpus.Instance.RemoveExpiredTokens();
        }
    }
}
