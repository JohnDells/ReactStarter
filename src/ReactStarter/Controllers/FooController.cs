using ReactStarter.Common.Api;
using ReactStarter.Common.Data;
using ReactStarter.Common.Managers;
using ReactStarter.Common.QueryData;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;

namespace ReactStarter.Controllers
{
    [Route("api/[controller]/[action]")]
    public class FooController : ControllerBase
    {
        private readonly FooManager _manager;

        public FooController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _manager = new FooManager(unitOfWork);
        }

        [HttpGet]
        public Package<List<FooViewModel>, int> Get(QueryDataOptions<FooViewModel> options)
        {
            try
            {
                var query = _manager.Get();

                return query.ToPackage(options);
            }
            catch (Exception ex)
            {
                return new Package<List<FooViewModel>, int>(ex);
            }
        }

        [HttpPost]
        public Package<int> Save([FromBody]FooViewModel model)
        {
            try
            {
                var id = _manager.Save(model);

                return new Package<int>(id, "The call filter was successfully saved.");
            }
            catch (Exception ex)
            {
                return new Package<int>(ex);
            }

        }

        [HttpPost("{id}")]
        public Package Delete(int id)
        {
            try
            {
                _manager.Delete(id);

                return new Package("The call filter was successfully deleted.");
            }
            catch (Exception ex)
            {
                return new Package(ex);
            }
        }

    }
}
