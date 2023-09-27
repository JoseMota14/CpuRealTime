using CpuServer.Models;
using CpuServer.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace CpuServer.Hubs
{
    public class CpuHub : Hub
    {
        private readonly ICpuService _cpuService;
        public CpuHub(ICpuService cpuService)
        {
            _cpuService = cpuService;
        }

        public override async Task OnConnectedAsync()
        {
            //await Clients.All.SendAsync("ReceiveData", "Started");
            await base.OnConnectedAsync();
            // Start streaming when a client connects
            await StartStreaming();
        }

        // Used on connection.onclose
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
            // Clean up when a client disconnects
            Cpus.Instance.Complete();
        }

        public async Task StartStreaming()
        {
            while (true)
            {
                var data = _cpuService.GetCpuUsage();

                // Write the data to the channel
                await Cpus.Instance.AddValue(data);

                // Send the data to all connected clients
                await Clients.All.SendAsync("ReceiveData", data);

                // Adjust the streaming interval as needed
                await Task.Delay(TimeSpan.FromMinutes(1));
            }
        }


        // Used by connection.invoke("Join", {UserConnection} )
        /*public async Task Join(UserConnection info)
        {
            await Clients.All.SendAsync("ReceiveMessage", $"Hey everyone, {info.Name} joined");
        }

        // Used  in connection.on("ObtainSomeValue", data);
        public Task SendData1()
        {
            return Clients.All.SendAsync("ObtainSomeValue", "a");
        }*/
    }
}
