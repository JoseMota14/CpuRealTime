using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace CpuServer.Models
{
    public class Cpus
    {
        public static Cpus Instance => instance.Value;

        private static readonly Lazy<Cpus> instance = new Lazy<Cpus>(() => new Cpus());

        private Channel<CpuUsage> channel = Channel.CreateUnbounded<CpuUsage>();

        public Cpus()
        {
            channel = Channel.CreateUnbounded< CpuUsage>();
        }

        public async Task AddValue(CpuUsage data)
        {
            await channel.Writer.WriteAsync(data);
        }

        public void Complete()
        {
            channel.Writer.TryComplete();
        }

        public void RemoveExpiredTokens()
        {
            channel = Channel.CreateUnbounded<CpuUsage>();
        }
    }

}