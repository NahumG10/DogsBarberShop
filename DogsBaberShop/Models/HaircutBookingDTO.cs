using System.ComponentModel.DataAnnotations;

namespace DogsBarberShop.Models
{
    public class HaircutBookingDTO
    {
        
        [Required]
        public DateTime BookingDate { get; set; }
        [Required]
        public int BookingHour { get; set; }
    }
}
