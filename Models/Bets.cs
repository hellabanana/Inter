using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthCheck.Models
{
    public class Bets
    {
        [Key]
        public int BetId { get; set; }
        public Lot LotBet { get; set; }
        public User UserBet { get; set; }
        public double NewPrice { get; set; }
    }
}
