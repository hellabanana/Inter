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

        public ICollection<Lot> Lots { get; set; }
        public Category()
        {
            Lots = new List<Lot>();

        }

    }
}
