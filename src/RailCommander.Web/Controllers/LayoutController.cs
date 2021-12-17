using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RailCommander.Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class LayoutController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            var f = System.IO.File.ReadAllText("layout.json");
            return f;
        }
    }
}
