using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseTracker.API.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }
        
        [Required]
        public DateTime Date { get; set; } = DateTime.Now;
        
        [Required]
        public int CategoryId { get; set; }
        
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
    }
}
