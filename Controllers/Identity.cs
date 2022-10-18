using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Client.Models;
using Microsoft.EntityFrameworkCore;
using Client.Filters;
using Client.Repositories;
using Client.Classes;
using Microsoft.AspNetCore.Authorization;

namespace TodoApi.Controllers
{
    [ApiController]
    [ExceptionFilter]
    [Route("[controller]")]
    public class IdentityController : ControllerBase
    {
        private readonly ILogger<IdentityController> _logger;
        private readonly UserRepository _userRepository;
        private readonly PasswordManager _passwordManager;
        private readonly LoginManager _loginManager;


        public IdentityController(ILogger<IdentityController> logger, UserRepository userRepository, PasswordManager passwordManager,
            LoginManager loginManager)
        {
            _logger = logger;
            _userRepository = userRepository;
            _passwordManager = passwordManager;
            _loginManager = loginManager;
        }



        [Route("register")]
        [HttpPost]
        public async Task<ActionResult> Register([FromBody] User user)
        {
            if (await _userRepository.Find(x => x.Email == user.Email).AnyAsync())
                return Ok(new { exist = true });
            user.Password = _passwordManager.HashPassword(user.Password);
            _userRepository.Create(user);
            await _userRepository.SaveChanges();
            await Login(await _userRepository.Find(x => x.Email == user.Email).Select(x => x.Id.ToString()).FirstOrDefaultAsync());
            return StatusCode(201, new { name = $"{user.FirstName} {user.LastName}", email = user.Email });
        }

        [Route("login")]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] User user)
        {
            var dbUser = await _userRepository.Find(x => x.Email == user.Email).FirstOrDefaultAsync();
            if (dbUser == null || !_passwordManager.ValidatePassword(user.Password, dbUser.Password))
                return Ok(new { login = false });
            await Login(dbUser.Id.ToString());
            return Ok(new { login = true, user = new { email = dbUser.Email, name = $"{dbUser.FirstName} {dbUser.LastName}" } });
        }

        [Authorize]
        [Route("logout")]
        [HttpGet]
        public async Task<ActionResult> LogOut()
        {
            await _loginManager.logOut();
            return Ok();
        }

        [Authorize]
        [Route("checklogin")]
        [HttpGet]
        public async Task<ActionResult> CheckLogin()
        {
            if (User.Identity.Name != null)
            {
                Guid id = Guid.Parse(User.Identity.Name);
                var user = await _userRepository.Find(x => x.Id == id).FirstOrDefaultAsync();
                return Ok(new { login = true, user = new { name = $"{user.FirstName} {user.LastName}", email = user.Email } });
            }
            else
                return Ok(new { login = false });
        }

        private async Task Login(string userId)
        {
            await _loginManager.Login(userId);
        }
    }
}