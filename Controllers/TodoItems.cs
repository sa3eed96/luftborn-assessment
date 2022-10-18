using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Client.Models;
using Microsoft.EntityFrameworkCore;
using Client.Filters;
using Client.Repositories;
using Microsoft.AspNetCore.Authorization;
using Client.Classes;

namespace Client.Controllers
{
    [ApiController]
    [Authorize]
    [ExceptionFilter]
    [Route("[controller]")]
    public class TodoItemsController : ControllerBase
    {
        private readonly ILogger<TodoItemsController> _logger;
        private readonly TodoRepository _todoRepository;
        private readonly Guid _userId;


        public TodoItemsController(ILogger<TodoItemsController> logger, TodoRepository todoRepository, LoginManager loginManager)
        {
            _logger = logger;
            _todoRepository = todoRepository;
            _userId = loginManager.GetLoggedInUser();
        }


        [HttpGet]
        public async Task<ActionResult> Index(int page = 1, int pageSize = 8)
        {
            var todoItems = await _todoRepository.GetAllPaged(x => x.Name, page, pageSize).ToListAsync();
            var totalCount = await _todoRepository.GetAll().CountAsync();
            return Ok(new { items = todoItems, count = totalCount });
        }

        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult> Get(Guid id)
        {
            var todoItem = await _todoRepository.Find(x => x.Id == id).FirstOrDefaultAsync();
            if (todoItem == null) return NotFound();
            return Ok(todoItem);
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult> Create([FromBody] TodoItem todoItem)
        {
            todoItem.Id = Guid.NewGuid();
            todoItem.UserId = _userId;
            _todoRepository.Create(todoItem);
            await _todoRepository.SaveChanges();
            return StatusCode(201, todoItem.Id);
        }


        [HttpPatch]
        [Route("update")]
        public async Task<ActionResult> Update([FromBody] TodoItem todoItem)
        {
            var dbTodoItem = _todoRepository.Find(x => x.Id == todoItem.Id).FirstOrDefault();
            if (dbTodoItem == null) return NotFound();

            dbTodoItem.Name = todoItem.Name;
            dbTodoItem.Done = todoItem.Done;

            _todoRepository.Update(dbTodoItem);
            await _todoRepository.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{id:Guid}")]

        public async Task<ActionResult> Delete(Guid id)
        {
            var todoItem = _todoRepository.Find(x => x.Id == id).FirstOrDefault();
            if (todoItem == null) return NotFound();

            _todoRepository.Delete(todoItem);
            await _todoRepository.SaveChanges();

            return Ok();
        }
    }
}
