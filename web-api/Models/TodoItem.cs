using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web_api.Models
{
    public class TodoItem
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public bool IsImportant { get; set; }

        public bool IsDone { get; set; }
    }
}
