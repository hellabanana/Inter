using HealthCheck.Models;
using HealthCheck.Pages;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace HealthCheck.Controllers
{

    [ApiController]
    [Route("/api/categories")]
    public class CategoryController: ControllerBase
    {
        private ApplicationContext conn;
     public   CategoryController(ApplicationContext db) {
            conn = db;
        
        }

        [HttpGet]
        public IEnumerable<Category> Get()
        {
           
            return conn.Categories.ToArray();
        }

        [HttpGet("{id}")]
        public Category Get(int id)
        {
            Category product = conn.Categories.FirstOrDefault(x => x.CategoryId == id);
            return product;
        }

        [HttpPost]
        public IActionResult Post(Category product)
        {
            if (ModelState.IsValid)
            {
                conn.Categories.Add(product);
                conn.SaveChanges();
                return Ok(product);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Category product)
        {
            if (ModelState.IsValid)
            {
                conn.Update(product);
                conn.SaveChanges();
                return Ok(product);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Category product = conn.Categories.FirstOrDefault(x => x.CategoryId == id);
            if (product != null)
            {
                conn.Categories.Remove(product);
                conn.SaveChanges();
            }
            return Ok(product);
        }

    }
}
