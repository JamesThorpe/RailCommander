using Microsoft.AspNetCore.Mvc;
using RailCommander.Api.Models;
using RailCommander.Core.Locomotives;

namespace RailCommander.Api.Controllers
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

        [HttpPost]
        [Route("function")]
        public async Task SetEngineFunction(FunctionRequest request)
        {
            await engineManager.SetEngineFunction(request.Address, request.Index, request.On);
        }
    }
}
