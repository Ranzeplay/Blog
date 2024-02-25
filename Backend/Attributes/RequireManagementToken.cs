using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

namespace Backend.Attributes
{
    public class RequireManagementToken(IOptions<AppSettings> options, ILogger<RequireManagementToken> logger) : ActionFilterAttribute
    {
        private readonly AppSettings _appSettings = options.Value;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                logger.LogInformation("Skipped authentication.");
                base.OnActionExecuting(context);
                return;
            }

            if (_appSettings.ManagementToolAccessToken == context.HttpContext.Request.Headers.Authorization)
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
