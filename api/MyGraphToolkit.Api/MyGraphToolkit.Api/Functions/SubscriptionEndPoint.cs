using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MyGraphToolkit.Api.Models;
using Newtonsoft.Json;
using Utf8Json;

namespace MyGraphToolkit.Api.Functions
{
    public static class SubscriptionEndPoint
    {
        [FunctionName("SubscriptionEndPoint")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string token = req.Query["validationToken"];
            if (token != null)
            {
                log.LogInformation("token Validation");
                return new ContentResult { Content = token, ContentType = "text/plain", StatusCode = 200 };
            }

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            log.LogInformation(requestBody);
            Subscription data = Utf8Json.JsonSerializer.Deserialize<Subscription>(requestBody);

            if (data.Value.Any())
            {
                IEnumerable<Response> res = data.Value.Select(s =>
                {
                    string userId = s.GetUserId();
                    return new Response
                    {
                        UserId = userId,
                        Activity = s.ResourceData.Activity,
                        Availability = s.ResourceData.Availability
                    };
                });
                log.LogInformation("res", res);
            }


            return new OkObjectResult("run");

        }
    }
}
