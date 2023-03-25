
using Domain;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class UserException
    {
        public class Query: IRequest<List<User>>{};
        public class Handler : IRequestHandler<Query, List<User>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public Task<List<User>> Handle(Query request, CancellationToken cancellationToken)
            {    
                 throw new Exception("Esta es una Excepcion COntrolada");     
               // return await _context.Users.ToListAsync();
            }
        }
    }
}