using System;
using System.Collections.Generic;

#nullable disable

namespace Client.Models
{
    public partial class TodoItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Done { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime Day { get; set; }
        public Guid UserId { get; set; }

        public virtual User User { get; set; }
    }
}
