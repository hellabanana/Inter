using System;
using System.ComponentModel.DataAnnotations;

namespace HealthCheck.Models
{
    public class Bets
    {
        [Key]
        public int BetId { get; set; }
        public Lot LotBet { get; set; }
        public User UserBet { get; set; }
        public double NewPrice { get; set; }
        public DateTime TimeBet { get; set; }
    }
}
