using LocalService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using System.Net;

namespace LocalService.Attributes
{
    public class RequireAccessToken : ActionFilterAttribute
    {
        private readonly AppSettings _appSettings;

        public RequireAccessToken(IOptions<AppSettings> options)
        {
            _appSettings = options.Value;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (_appSettings.AccessToken == context.HttpContext.Request.Headers["Authorization"])
            {
                base.OnActionExecuting(context);
            }
            else
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}
