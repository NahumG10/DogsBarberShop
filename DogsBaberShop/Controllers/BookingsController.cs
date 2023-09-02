using Azure.Core;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using DogsBarberShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using System.Data;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DogsBarberShop.Controllers
{
    // authorize every reauest with bearer jwt
    [Route("api/[controller]")]
    [ApiController, Authorize]

    public class BookingsController : Controller
    {
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public BookingsController(DataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
        }

        [HttpGet("GetBookingsList")]
        public IActionResult GetBookingsList() {
            try
            {
                SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Db"));
                connection.Open();
                SqlCommand command = new SqlCommand(
                    @"SELECT   Users.Id,
		                       Users.FullName,
		                       [CustomerBookings].[Id]
                              ,[CreatedTime]
                              ,[BookingDate]
                              ,[BookingHour]
                          FROM [DogsBarberShop].[dbo].[CustomerBookings] inner join 
                            [DogsBarberShop].[dbo].[Users] on BookingUserId = Users.Id order by [BookingDate] asc", connection);
                SqlDataReader dataReader = command.ExecuteReader();
                List<dynamic> bookings = new List<dynamic>();
                while (dataReader.Read())
                {
                    bookings.Add(
                    new
                    {
                        userId = dataReader.GetValue(0),
                        name = dataReader.GetValue(1),
                        bookingId = dataReader.GetValue(2),
                        created = dataReader.GetValue(3),
                        date = dataReader.GetValue(4),
                        hour = dataReader.GetValue(5)
                    });
                }

                connection.Close();

                return Ok(bookings);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddNewBooking")]
        public async Task<IActionResult> AddNewBooking(HaircutBookingDTO request)
        {
            try
            {
                string decodedUsername = GetUsernameFromJwtPayload(Request.Headers[HeaderNames.Authorization]!);
                var user = _dataContext.Users.FirstOrDefault(u => u.Username == decodedUsername);

                if (user == null)
                {
                    return BadRequest("משתמש לא נמצא");
                }

                if (request.BookingDate < DateTime.Today)
                {
                    return BadRequest("לא ניתן לקבוע תור בעבר!");
                }

                var exisitgBooking = _dataContext.CustomerBookings.FirstOrDefault(b=> b.BookingDate == request.BookingDate && b.BookingHour == request.BookingHour);

                if (exisitgBooking != null)
                {
                    return BadRequest("התור תפוס");
                }

                var newBooking = new HaircutBooking()
                {
                    BookingHour = request.BookingHour,
                    BookingDate = request.BookingDate,
                    BookingUser = user,
                    CreatedTime = DateTime.UtcNow
                };

                _dataContext.CustomerBookings.Add(newBooking);
                await _dataContext.SaveChangesAsync();

                return Ok("תור נקבע בהצלחה");

            }
            catch (Exception ex)
            {
                return BadRequest("Error");
            }
        }


        private static string GetUsernameFromJwtPayload(string accessToken)
        {
            accessToken = accessToken.Split(" ")[1];

            JwtSecurityTokenHandler jwtHandler = new JwtSecurityTokenHandler();

            JwtSecurityToken decodedToken = new JwtSecurityToken(accessToken);
            return decodedToken.Claims.First(claim => claim.Type == "name").Value;
        }

        [HttpPatch("EditBooking")]
        public async Task<IActionResult> EditBooking(int HaircutId, DateTime date, int hour)
        {
            try
            {
                string decodedUsername = GetUsernameFromJwtPayload(Request.Headers[HeaderNames.Authorization]!);

                var booking = _dataContext.CustomerBookings.FirstOrDefault(u => u.Id == HaircutId && u.BookingUser.Username == decodedUsername);

                if (booking == null)
                {
                    return BadRequest("לא נמצא התור לעריכה");
                }

                if (date < DateTime.Today)
                {
                    return BadRequest("לא ניתן לקבוע תור בעבר!");
                }

                var exisitgBooking = _dataContext.CustomerBookings.FirstOrDefault(b => b.BookingDate == date && b.BookingHour == hour);

                if (exisitgBooking != null)
                {
                    return BadRequest("התור תפוס");
                }

                booking.BookingDate = date;
                booking.BookingHour = hour;

                _dataContext.CustomerBookings.Update(booking);
                await _dataContext.SaveChangesAsync();

                return Ok("התור עודכן בהצלחה");

            }
            catch (Exception ex)
            {
                return BadRequest("Error");
            }
        }

        [HttpDelete("DeleteBooking")]
        public async Task<IActionResult> DeleteBooking(int HaircutId)
        {
            try
            {
                string decodedUsername = GetUsernameFromJwtPayload(Request.Headers[HeaderNames.Authorization]!);

                var booking = _dataContext.CustomerBookings.FirstOrDefault(u => u.Id == HaircutId && u.BookingUser.Username == decodedUsername);

                if (booking == null)
                {
                    return BadRequest("booking not found");
                }
            
                _dataContext.CustomerBookings.Remove(booking);
                await _dataContext.SaveChangesAsync();

                return Ok("התור בוטל בהצלחה");

            }
            catch (Exception ex)
            {
                return BadRequest("Error");
            }
        }

    }
}
