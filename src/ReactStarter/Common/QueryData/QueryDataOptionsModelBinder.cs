using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc.ModelBinding;
using System.Reflection;
using System.Linq.Expressions;
using Microsoft.AspNet.Http;

namespace ReactStarter.Common.QueryData
{
    public class QueryDataOptionsModelBinder : IModelBinder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="QueryDataOptionsModelBinder" /> class.
        /// </summary>
        public QueryDataOptionsModelBinder()
        {
        }

        public Task<ModelBindingResult> BindModelAsync(ModelBindingContext bindingContext)
        {
            var modelType = bindingContext.ModelType;
            var request = bindingContext.OperationBindingContext.HttpContext.Request;
            var typeInfo = modelType.GetTypeInfo();

            if (typeInfo.IsGenericType && typeInfo.GetGenericTypeDefinition() == typeof(QueryDataOptions<>))
            {
                var model = Create(modelType, GetOptions(request));
                return ModelBindingResult.SuccessAsync(bindingContext.ModelName, model);
            }

            return ModelBindingResult.NoResultAsync;
        }

        IDictionary<string, string> GetOptions(HttpRequest request)
        {
            return request.Query.ToDictionary(p => p.Key, p => p.Value.FirstOrDefault());
        }

        static object Create(Type type, params object[] args)
        {
            return args.Any() ? GetActivator(type, args)(args) : GetActivator(type)();
        }

        static Func<object[], object> GetActivator(Type type, IEnumerable<object> args)
        {
            var argTypes = args.Select(x => x.GetType()).ToArray();
            var ctorInfo = type.GetTypeInfo().GetConstructor(argTypes);

            if (ctorInfo == null)
            {
                throw new ArgumentException("Constructor with the specified number, order, and type of parameters was not found!");
            }

            var argValues = Expression.Parameter(typeof(object[]));
            var ctorArguments = GetConstructorArguments(ctorInfo, argValues);

            var lambda = Expression.Lambda(typeof(Func<object[], object>), Expression.New(ctorInfo, ctorArguments), argValues);
            return (Func<object[], object>)lambda.Compile();
        }

        static Func<object> GetActivator(Type type)
        {
            return (Func<object>)Expression.Lambda(Expression.Convert(Expression.New(type), typeof(object))).Compile();
        }

        static Expression[] GetConstructorArguments(ConstructorInfo ctorInfo, ParameterExpression argValues)
        {
            var argTypes = ctorInfo.GetParameters().Select(x => x.ParameterType).ToArray();
            var ctorArguments = new Expression[argTypes.Length];

            for (int i = 0; i < argTypes.Length; i++)
            {
                var argAccessor = Expression.ArrayIndex(argValues, Expression.Constant(i));
                ctorArguments[i] = Expression.Convert(argAccessor, argTypes[i]);
            }

            return ctorArguments;
        }
    }
}
