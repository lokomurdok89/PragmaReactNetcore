using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class UsersController:BaseApiController
    {
         private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        } 
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers(){
            
            return await _context.Users.ToListAsync(); 
            //return await Mediator.Send(new List.Query());   
        }    
        [HttpGet("{id}")]  
        public async Task<ActionResult<User>> GetUser(Guid Id){
            return await _context.Users.FindAsync(Id);

            //return await Mediator.Send(new Details.Query{Id=Id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user){
            return Ok();
            //return Ok(await Mediator.Send(new Create.Command{Activity=activity}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(Guid Id, User user){
            return Ok();
            //User.Id = Id;
            //return Ok(await Mediator.Send(new Edit.Command{Activity=activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid Id){
            return Ok();
           // return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }
        
    }
}