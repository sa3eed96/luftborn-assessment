using System;
using System.Threading;
using System.Web.Http.Filters;

namespace Client.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public void ExecuteExceptionFilterAsync(HttpActionExecutedContext context, CancellationToken token)
        {
            string exception = context.Exception.InnerException != null ? context.Exception.InnerException.Message : context.Exception.Message;
            Console.WriteLine($"{context.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerName}, {context.ActionContext.ActionDescriptor.ActionName}: {exception}");

            context.Response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
        }
    }
}