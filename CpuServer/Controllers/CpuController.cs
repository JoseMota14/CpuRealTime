using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;
using CpuServer.Services;

namespace CpuServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CpuController : ControllerBase
    {
        private readonly ICpuService _cpuService;
        public CpuController(ICpuService cpuService)
        {
            _cpuService = cpuService;
        }
        [HttpGet("getCpu")]
        public async Task<ActionResult> GetCpuInfo()
        {
            try
            {
                var cpu = await _cpuService.GetCpuInfo();
                ContentResult contentResult = new ContentResult
                {
                    Content = Newtonsoft.Json.JsonConvert.SerializeObject(cpu),
                    ContentType = "application/json",
                    StatusCode = 200
                };
                return contentResult;
            }
            catch (Exception ex)
            {
                ContentResult contentResult = new ContentResult
                {
                    Content = ex.Message,
                    ContentType = "application/xml",
                    StatusCode = 500
                };
                return contentResult;
            }
        }
    }
}
