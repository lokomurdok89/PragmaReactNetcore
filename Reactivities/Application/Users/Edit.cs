
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
namespace Application.Users
{
    public class Edit
    {
         public class Command: IRequest{
            public User  user { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {               
                _context = context;                
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var _user = await _context.Users.FindAsync(request.user.Id);
                if(_user != null){
                    _user.Correo = request.user.Nombre;
                    _user.Nombre = request.user.Correo;
                    _user.Rut = request.user.Rut;
                    await _context.SaveChangesAsync();
                }
                return Unit.Value;
                
            }
        }
        
    }
}