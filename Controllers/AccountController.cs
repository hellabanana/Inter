using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using HealthCheck.Models;
using HealthCheck.Pages;
using HealthCheck.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace HealthCheck.Controllers
{

    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private ApplicationContext conn { get; set; }
      public  AccountController(ApplicationContext context)
        {
            conn = context;
        }
        [Microsoft.AspNetCore.Authorization.Authorize]
        [HttpGet("login")]
        public IActionResult LoginName()
        {
           var  response = new
            {
                username = User.Identity.Name
            
            };
         return   Json(response);
        }
       
        [HttpPost("token")]
        public IActionResult Token([FromBody]LoginMock log)
        {
            string username = log.username;
            string password = log.password;
            
  
            var identity = GetIdentity(username, password);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            return Json(response);
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            User person = conn.Users.FirstOrDefault(x => x.Email == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType,person.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType,conn.Roles.First(x=>x.Id==person.RoleId).Name)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            
            return null;
        }

        [HttpPost("reg")]
        public IActionResult Reg([FromBody]LoginMock log)
        {
            string username = log.username;
            string password = log.password;

            if (conn.Users.Where(x => x.Email == username).Count() == 0)
            {
                conn.Users.Add(new User() {
                    Email = username,
                    Password = password,
                    Role = conn.Roles.FirstOrDefault(x => x.Name == "user" )}) ;
                conn.SaveChangesAsync();
                return Ok();
            }
            else


                return BadRequest(new { errorText = "Такой пользователь уже существует." });
        }
    }

     public class LoginMock
    {
        public string username { get; set; }
        public string password { get; set; }

    }
}