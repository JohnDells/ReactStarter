using System.Data.Entity;

namespace ReactStarter.Common.Data
{
    public interface IUnitOfWork
    {
        int SaveChanges();

        DbSet<Foo> Foos { get; set; }
    }
}
