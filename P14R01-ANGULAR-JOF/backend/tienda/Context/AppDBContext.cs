using Microsoft.EntityFrameworkCore;
using tienda.models;

namespace tienda.Context
{
    public class AppDBContext: DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<Productos> productos { get; set; }
        public DbSet<Categorias> categorias { get; set; }
    }
}
