using System.Data.Entity;

namespace ReactStarter.Common.Data
{
    public partial class UnitOfWork : DbContext, IUnitOfWork
    {
        public UnitOfWork(string connectionString)
            : base(connectionString)
        {
        }

        public virtual DbSet<Foo> Foos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }

}
