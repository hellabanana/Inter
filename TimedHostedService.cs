using HealthCheck.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HealthCheck
{
    public class TimedHostedService : IHostedService, IDisposable
    {
        
        private ApplicationContext _ctx;
        private Timer _timer;

        public TimedHostedService(ApplicationContext ctx)
        {   
           _ctx = ctx;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(60));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            DbSet<Models.Lot> items = _ctx.Lot;
            List<Models.Bets> bets = _ctx.Bets.ToList();
            List<Models.Lot> x = new List<Models.Lot>();
           
            foreach (var item in items)
            {

                if (item.DateEnd < DateTime.Now)
                {
                    if (bets.Where(x => x.LotBet == item).Count() == 0)
                    {
                        item.state = "Завершен";
                    }
                    else
                    {
                        
                        item.Buyer = bets.First(x=>x.NewPrice==bets.Max(c=>c.NewPrice)).UserBet;
                        item.state = "Продан";
                    }


                    x.Add(item);
                }
                if ( item.DateStart <DateTime.Now && item.state == "Проверен")
                {
                    item.state = "Активен";
                    x.Add(item);
                }
            }
           
            _ctx.Lot.UpdateRange(x);
            _ctx.SaveChangesAsync();
            
        }
        public bool Comp(DateTime t1,DateTime t2)
        {
            if (t1.Month > t2.Month)
            {
                return true;
            }
            else if (t1.Month == t2.Month)
            {
                if (t1.Day > t2.Day)
                    return true;
                else if (t1.Day == t2.Day)
                {
                    if (t1.Hour > t2.Hour) return true;
                    else if (t1.Hour == t2.Hour)
                    {

                        if (t1.Minute >= t2.Minute) return true;
                        else return false;
                    }
                    else return false;



                }
                else return false;
            }
            else return false;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
