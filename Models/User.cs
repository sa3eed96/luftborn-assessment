using System;
using System.Collections.Generic;

#nullable disable

namespace Client.Models
{
    public partial class User
    {
        public User()
        {
            TodoItems = new HashSet<TodoItem>();
        }

        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<TodoItem> TodoItems { get; set; }
    }
}
