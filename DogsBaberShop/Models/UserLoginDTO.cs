using System.ComponentModel.DataAnnotations;

namespace DogsBarberShop.Models
{
    public class UserLoginDTO
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required, MinLength(6)]
        public string Password { get; set; } = string.Empty;
    }
}
