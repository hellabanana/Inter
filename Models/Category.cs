using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthCheck.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        public string CategoryName { get; set; }

        public List<Lot> Lots { get; set; }

    }
}
