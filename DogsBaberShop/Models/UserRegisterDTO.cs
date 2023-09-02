using System.ComponentModel.DataAnnotations;

namespace DogsBarberShop.Models
{
    public class UserRegisterDTO
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required, MinLength(6)]
        public string Password  { get; set; } = string.Empty;
        [Required, MinLength(4)]
        public string Fullname  { get; set; } = string.Empty;
    }
}
