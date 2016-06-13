using System.Linq;
using System.Linq.Dynamic;

namespace ReactStarter.Common.QueryData
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> QueryDataOptions<T>(this IQueryable<T> query, QueryDataOptions<T> options)
        {
            return query.FilterClause(options).OrderByClause(options).SkipClause(options).TopClause(options);
        }

        public static int QueryDataCount<T>(this IQueryable<T> query, QueryDataOptions<T> options)
        {
            if (options?.Count == null) return 0;
            bool showCount = false;
            var success = bool.TryParse(options.Count, out showCount);
            if (!success || !showCount) return 0;

            return query.FilterClause(options).Count();
        }

        private static IQueryable<T> FilterClause<T>(this IQueryable<T> query, QueryDataOptions<T> options)
        {
            if (options?.Filter == null) return query;
            return query.Where(options.Filter);
        }

        private static IQueryable<T> OrderByClause<T>(this IQueryable<T> query, QueryDataOptions<T> options)
        {
            if (options?.OrderBy == null) return query;
            return query.OrderBy(options.OrderBy);
        }

        private static IQueryable<T> SkipClause<T>(this IQueryable<T> query, QueryDataOptions<T> options)
        {
            if (options.Skip == null) return query;
            int skip = 0;
            var success = int.TryParse(options.Skip, out skip);
            if (!success) return query;
            return query.Skip(skip);
        }

        private static IQueryable<T> TopClause<T>(this IQueryable<T> query, QueryDataOptions<T> options)
        {
            var rawTop = string.IsNullOrEmpty(options.Top) ? "250" : options.Top;
            int top = 0;
            var success = int.TryParse(rawTop, out top);
            if (!success) return query;
            return query.Take(top);
        }
    }
}
