using ReactStarter.Common.Data;
using System;
using System.Linq;

namespace ReactStarter.Common.Managers
{
    public class FooManager : ManagerBase
    {
        public FooManager(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public IQueryable<FooViewModel> Get()
        {
            return _unitOfWork.Foos.Select(x => new FooViewModel
            {
                ID = x.ID,
                Name = x.Name,
                Active = x.Active
            });
        }

        public int Save(FooViewModel model)
        {
            Foo item = null;

            if (model.ID == 0)
            {
                item = new Foo
                {
                    Name = model.Name,
                    Active = true
                };

                _unitOfWork.Foos.Add(item);
            }
            else
            {
                item = _unitOfWork.Foos.Where(x => x.ID == model.ID).FirstOrDefault();
                if (item == null)
                {
                    throw new ArgumentException("The item was not found.");
                }

                item.Name = model.Name;
                item.Active = model.Active;
            }

            _unitOfWork.SaveChanges();

            return item.ID;
        }

        public void Delete(int id)
        {
            var item = _unitOfWork.Foos.Where(x => x.ID == id && x.Active).FirstOrDefault();
            if (item == null)
            {
                throw new ArgumentException("The item was not found.");
            }

            item.Active = false;
            _unitOfWork.SaveChanges();
        }
    }

    public class FooViewModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public bool Active { get; set; }
    }
}
