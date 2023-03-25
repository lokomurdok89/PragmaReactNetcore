using Application;
using Application.Users;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{   
    public class UsersController:BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers(){           
          
           return await Mediator.Send(new List.Query());   
        }    
        [HttpGet("{id}")]  
        public async Task<ActionResult<User>> GetUser(Guid Id){
            return await Mediator.Send(new Details.Query{Id=Id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user){
            return Ok(await Mediator.Send(new Create.Command{user=user}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(Guid Id, User user){           
            user.Id = Id;
            return Ok(await Mediator.Send(new Edit.Command{user=user}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid Id){
            return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }
        [HttpGet]
        [Route("Exception")]
        public async Task<ActionResult<List<User>>> GetException(){           
          
           return await Mediator.Send(new UserException.Query());   
        }    
        
    }
}