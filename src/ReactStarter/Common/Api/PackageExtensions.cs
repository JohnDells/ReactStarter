using ReactStarter.Common.QueryData;
using System.Collections.Generic;
using System.Linq;

namespace ReactStarter.Common.Api
{
    public static class PackageExtensions
    {
        public static Package<List<T>, int> ToPackage<T>(this List<T> list, QueryDataOptions<T> options)
        {
            return list.AsQueryable().ToPackage(options);
        }

        public static Package<List<T>, int> ToPackage<T>(this IQueryable<T> query, QueryDataOptions<T> options)
        {
            var result = query.QueryDataOptions(options).ToList();

            var count = query.QueryDataCount(options);

            return new Package<List<T>, int>(result, count);
        }

        /// <summary>
        /// This overload without the queryData options just grabs the first record and creates a package from that.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public static Package<T> ToPackage<T>(this IQueryable<T> query)
        {
            var result = query.FirstOrDefault();

            return new Package<T>(result);
        }

        public static Package<T> ToPackage<T>(this T item)
        {
            return new Package<T>(item);
        }
    }
}
