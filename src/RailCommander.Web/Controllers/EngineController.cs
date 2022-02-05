using Microsoft.AspNetCore.Mvc;
using RailCommander.Core.Locomotives;
using RailCommander.Web.Models;
using System.Threading.Tasks;

namespace RailCommander.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EngineController : ControllerBase
    {
        private readonly EngineManager engineManager;

        public EngineController(EngineManager engineManager)
        {
            this.engineManager = engineManager;
        }

        [HttpPost]
        [Route("speed")]
        public async Task SetEngineSpeed(SpeedRequest request)
        {
            await engineManager.SetEngineSpeed(request.Address, request.Speed, request.Forwards);
        }
    }
}
