using ReactStarter.Common.Data;

namespace ReactStarter.Common.Managers
{
    public class ManagerBase
    {
        protected readonly IUnitOfWork _unitOfWork;

        public ManagerBase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
