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
        public string Picture { get; set; }
        [Required]
        public double StartPrice { get; set; }
        public double BuyOutPrice { get; set; } 
        public string Info { get; set; }
        public Category LotCategory { get; set; }
    }
}
