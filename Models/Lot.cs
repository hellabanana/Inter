using System;
using System.ComponentModel.DataAnnotations;

namespace HealthCheck.Models
{
    public class Lot
    {
        [Key]
        public int LotId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public File FileID { get; set; }
        [Required]
        public double StartPrice { get; set; }
        public double BuyOutPrice { get; set; } 
        public string Info { get; set; }
        public Category LotCategory { get; set; }
        public User Owner { get; set; }
        public User Buyer { get; set; }
        public DateTime DateEnd { get; set; }
        public DateTime DateStart { get; set; }
        public string Status { get; set; }
    }
}
