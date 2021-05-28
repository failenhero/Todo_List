using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web_api.Data;
using web_api.DTOs;
using web_api.Models;

namespace web_api.Controllers
{
    public class TodoController : BaseApiController
    {
        private readonly TodoContext db;

        public TodoController(TodoContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetAllTodos()
        {
            return await db.TodoList.ToListAsync();
        }

        [HttpPost]
        [Route("addnewtodo")]
        public async Task<ActionResult<TodoItem>> AddNewTodo(NewTodoDto dtoInfo)
        {
            TodoItem newTodoItem = new TodoItem
            {
                Text = dtoInfo.Text,
                IsDone = false,
                IsImportant = false
            };

            await db.TodoList.AddAsync(newTodoItem);

            await db.SaveChangesAsync();

            return newTodoItem;
        }

        [HttpPut]
        [Route("puttodo")]
        public async Task<ActionResult<TodoItem>> PutTodo(TodoItem item)
        {
            var oldTodo = await db.TodoList.FindAsync(item.Id);

            oldTodo.IsImportant = item.IsImportant;
            oldTodo.IsDone = item.IsDone;

            await db.SaveChangesAsync();

            return oldTodo;
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodo(int id)
        {
            TodoItem itemToDelete = await db.TodoList.FirstOrDefaultAsync(todo => todo.Id == id);

            if (itemToDelete == null)
                return NotFound();

            db.TodoList.Remove(itemToDelete);

            await db.SaveChangesAsync();

            return itemToDelete;
        }
    }
}
