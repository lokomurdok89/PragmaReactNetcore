using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class Create
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
                _context.Users.Add(request.user);// use addAsync when go to DB, this example is in memory
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
        
    }
}