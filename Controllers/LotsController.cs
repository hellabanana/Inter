using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthCheck.Models;
using HealthCheck.Pages;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;

namespace HealthCheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LotsController : Controller
    {
        private  ApplicationContext _context;
        IWebHostEnvironment _appEnvironment;

        public LotsController(ApplicationContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/Lots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lot>>> GetLot()
        {
           
            return await _context.Lot.Include(x => x.LotCategory).Include(u => u.Owner).Include(f=>f.FileID).ToListAsync();
        }

        // GET: api/Lots/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lot>> GetLot(int id)
        {
            var lot = await _context.Lot.FindAsync(id);

            if (lot == null)
            {
                return NotFound();
            }

            return lot;
        }

        [HttpGet("test")]
        public async Task<ActionResult<Lot>> Get()
        {

            string contentRootPath = _appEnvironment.ContentRootPath;
            string webRootPath = _appEnvironment.WebRootPath;

            return Content(webRootPath+"/Upload/pro-big-1.jpg");
        }

        // PUT: api/Lots/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLot(int id,Lot f)
        {
            var lot = _context.Lot.First(x => x.LotId == id);
            lot.state = "Проверен";
            _context.Entry(lot).State = EntityState.Modified;
            _context.Lot.Update(lot);
                await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("upd/{id}")]
        public async Task<IActionResult> PutUpd(int id, Lot f)
        {
            var lot = _context.Lot.First(x => x.LotId == id);
            lot.state = "Проверен";
            _context.Entry(lot).State = EntityState.Modified;
            _context.Lot.Update(lot);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // POST: api/Lots
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Lot>> PostLot([FromBody]LotMock mock)
        {
            
            try
            {
                Lot lot = new Lot()
                {
                    BuyOutPrice = mock.BuyOutPrice,
                    DateEnd = DateTime.ParseExact(mock.DateEnd, "yyyy-MM-dd'T'HH:mm", null),
                    FileID = _context.Files.First(x => x.Name == mock.Filename),
                    DateStart = DateTime.ParseExact(mock.DateStart, "yyyy-MM-dd'T'HH:mm", null),
                    Info = mock.Info,
                    Name = mock.Name,
                    Owner = _context.Users.First(u => u.Email == User.Identity.Name),
                    LotCategory = _context.Categories.First(x => x.CategoryName == mock.LotCategory),
                    StartPrice = mock.StartPrice,
                    state = "Не активен"


                };
                _context.Lot.Add(lot);
                await _context.SaveChangesAsync();
            }
            catch (Exception e){ return Json(e.Message+" Name:" + User.Identity.Name + " Cat:" + mock.LotCategory + " Name:"+ mock.Name);; }

            return Json("Ok!");
        }

        // DELETE: api/Lots/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Lot>> DeleteLot(int id)
        {
            var lot = await _context.Lot.FindAsync(id);
            _context.Bets.RemoveRange(_context.Bets.Where(x => x.LotBet == lot));
            if (lot == null)
            {
                return NotFound();
            }

            _context.Lot.Remove(lot);
            await _context.SaveChangesAsync();

            return lot;
        }

        private bool LotExists(int id)
        {
            return _context.Lot.Any(e => e.LotId == id);
        }

        [HttpPost("upload"), DisableRequestSizeLimit]
        public IActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                string folderName = "Upload";
                string webRootPath = _appEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string fullPath = Path.Combine(newPath, fileName);
                if (!System.IO.File.Exists(fullPath))
                {
                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    if (file.Length > 0)
                    {

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        _context.Files.Add(new Models.File() { Name = file.Name, Path = newPath });
                        _context.SaveChangesAsync();
                    }
                }
                

             
                return Json(""+fileName);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Upload Failed: " + ex.Message);
            }
        }
    }

   

    public class LotMock
    {
        public string Name { get; set; }
        public string Filename { get; set; }
        public double StartPrice { get; set; }
        public double BuyOutPrice { get; set; }
        public string Info { get; set; }
        public string LotCategory { get; set; }
        public string Owner{ get; set; }
        public string DateEnd { get; set; }
        public string DateStart { get; set; }
        public string Status { get; set; }
    }
}
