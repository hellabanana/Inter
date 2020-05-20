using HealthCheck.Models;
using HealthCheck.Pages;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BetsController : Controller
    {


        private ApplicationContext _context;
        IWebHostEnvironment _appEnvironment;

        public BetsController(ApplicationContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }


        // GET: api/Bets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bets>>> GetLot()
        {
            return await _context.Bets.Include(x => x.LotBet).Include(a => a.UserBet).ToListAsync();
        }

        // GET: api/Bets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bets>> GetLot(int id)
        {
          var list=  await _context.Bets.Include(x => x.LotBet).Include(a => a.UserBet).ToListAsync();
            return list.Where(x => x.LotBet.LotId == id).Last();
        }


    }
}
