using DataAccessLayer.Data;
using DataAccessLayer.Models;
using DogsBarberShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace DogsBarberShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public AuthController(DataContext context, IConfiguration configuration)
        {
            _dataContext = context;
            _configuration = configuration;
        }


        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegisterDTO request)
        {
            if(_dataContext.Users.Any(u => u.Username == request.Username)) {
                return BadRequest("שם משתמש זה כבר קיים");
            }

            CreateHashedPassword(request.Password, out byte[] passwordSalt, out byte[] passworedHash);

            var newUser = new User()
            {
                Username = request.Username,
                PasswordSalt = passwordSalt,
                HashedPassword = passworedHash,
                FullName = request.Fullname  
            };
            

            _dataContext.Users.Add(newUser);
            await _dataContext.SaveChangesAsync();

            return Ok("משתמש נוצר בהצלחה");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDTO request)
        {
            var user = _dataContext.Users.FirstOrDefault(u => u.Username == request.Username);
            if (user == null)
            {
                return BadRequest( "משתמש לא קיים");
            }

            if (!VerifyHashedPassword(request.Password, user.PasswordSalt, user.HashedPassword))
            {
                return BadRequest("סיסמא שגויה");
            }

            return Ok(CreateToken(user));
        }


        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>(){
                new Claim("name", user.Username),
                new Claim("id", user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Token").Value!));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: cred
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private static bool VerifyHashedPassword(string password, byte[] passwordSalt, byte[] passworedHash)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passworedHash);
            }
        }

        private static void CreateHashedPassword(string password, out byte[] passwordSalt, out byte[] passworedHash)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passworedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        } 

    }
}
