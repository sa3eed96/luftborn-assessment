using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;

namespace Client.Classes
{
    public class LoginManager
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public LoginManager(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public async Task Login(string userId)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userId),
            };
            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await _contextAccessor.HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    new AuthenticationProperties());
        }

        public async Task logOut()
        {
            await _contextAccessor.HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
        }

        public Guid GetLoggedInUser()
        {
            return Guid.Parse(_contextAccessor.HttpContext.User.Identity.Name);
        }
    }
}