using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace web_api.Models
{
    public class TodoItem
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public bool IsImportant { get; set; }

        [Required]
        public bool IsDone { get; set; }
    }
}
