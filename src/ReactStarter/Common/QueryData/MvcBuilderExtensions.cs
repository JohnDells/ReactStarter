using Microsoft.Extensions.DependencyInjection;

namespace ReactStarter.Common.QueryData
{
    public static class MvcBuilderExtensions
    {
        public static IMvcBuilder AddQueryData(this IMvcBuilder builder)
        {
            return builder.AddMvcOptions(o => o.ModelBinders.Insert(0, new QueryDataOptionsModelBinder()));
        }
    }
}
