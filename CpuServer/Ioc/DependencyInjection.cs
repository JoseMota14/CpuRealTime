using CpuServer.Models;
using CpuServer.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace CpuServer.Ioc
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<ICpuService, CpuService>();
            services.AddSingleton<Cpus>();

            return services;
        }
    }
}
