using CpuServer.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CpuServer.Services
{
    public interface ICpuService
    {
        Task<Cpu> GetCpuInfo();

        CpuUsage GetCpuUsage();
    }
}
