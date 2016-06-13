using ReactStarter.Common.Data;
using Microsoft.AspNet.Mvc;

namespace ReactStarter.Common.Api
{
    public class ControllerBase : Controller
    {
        protected readonly IUnitOfWork _unitOfWork;

        public ControllerBase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
