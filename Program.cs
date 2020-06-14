using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace HealthCheck
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).UseDefaultServiceProvider(x=>x.ValidateScopes=false).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                }).ConfigureServices(services =>
                services.AddHostedService<TimedHostedService>());
    }
}
