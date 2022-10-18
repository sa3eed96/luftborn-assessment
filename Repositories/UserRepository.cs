using Client.Models;

namespace Client.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(TodoContext context) : base(context)
        {

        }
    }
}