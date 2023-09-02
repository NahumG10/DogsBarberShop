using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = String.Empty;
        public string FullName { get; set; } = String.Empty;
        public byte[] HashedPassword { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];   


    }
}
