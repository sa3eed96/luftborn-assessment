using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using Client.Models;
using System.Threading.Tasks;

namespace Client.Repositories
{
    public abstract class Repository<T> where T : class
    {
        protected TodoContext _context { get; set; }
        public Repository(TodoContext context)
        {
            _context = context;
        }

        public virtual Task SaveChanges()
        {
            return _context.SaveChangesAsync();
        }

        public virtual IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsNoTracking();
        }
        public virtual IQueryable<T> GetAllPaged(Expression<Func<T, dynamic>> orderByExpression, int page, int pageSize)
        {
            return _context.Set<T>().OrderBy(orderByExpression).Skip((page - 1) * pageSize).Take(pageSize).AsNoTracking();
        }
        public virtual IQueryable<T> Find(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression).AsNoTracking();
        }
        public virtual void Create(T entity)
        {
            _context.Set<T>().Add(entity);
        }
        public virtual void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }
        public virtual void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
    }
}