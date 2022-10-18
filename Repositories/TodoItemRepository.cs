using Client.Models;
using Client.Classes;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using System;

namespace Client.Repositories
{
    public class TodoRepository : Repository<TodoItem>
    {
        private readonly Guid _userId;

        public TodoRepository(TodoContext context, LoginManager loginManager) : base(context)
        {
            _userId = loginManager.GetLoggedInUser();
        }

        public override IQueryable<TodoItem> GetAll()
        {
            return _context.Set<TodoItem>().Where(x => x.UserId == _userId).AsNoTracking();
        }
        public override IQueryable<TodoItem> GetAllPaged(Expression<Func<TodoItem, dynamic>> orderByExpression, int page, int pageSize)
        {
            return _context.Set<TodoItem>().Where(x => x.UserId == _userId).OrderBy(orderByExpression).Skip((page - 1) * pageSize).Take(pageSize).AsNoTracking();
        }
        public override IQueryable<TodoItem> Find(Expression<Func<TodoItem, bool>> expression)
        {
            return _context.Set<TodoItem>().Where(x => x.UserId == _userId).Where(expression).AsNoTracking();
        }
    }
}