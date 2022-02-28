using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            this._context = context;
            this._tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto userDto)
        {
            if (await UserExists(userDto.Username)) return BadRequest("UserName is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = userDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)),
                PasswordSalt = hmac.Key,
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            UserDto appUser = new UserDto
            {
                UserName = user.UserName,
                securityKey = _tokenService.CreateToken(user)
            };

            return appUser;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginUser)
        {
            var userFromDB = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginUser.Username);
            if (userFromDB == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(userFromDB.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginUser.Password));
            
            for(int i =0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != userFromDB.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            UserDto appUser = new UserDto
            {
                UserName = userFromDB.UserName,
                securityKey = _tokenService.CreateToken(userFromDB)
            };

            return appUser;
        }

        private async Task<bool> UserExists(string UserName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == UserName.ToLower());
        }

    }
}
