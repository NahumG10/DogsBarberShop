using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class HaircutBooking
    {
        public int Id { get; set; }
        public User BookingUser { get; set; }
        public DateTime BookingDate { get; set; }
        public int BookingHour { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}
