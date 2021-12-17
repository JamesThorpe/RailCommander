using Asgard.Communications;
using Asgard.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RailCommander.Core.Track;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RailCommander.Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class LayoutController : ControllerBase
    {
        private readonly ICbusMessenger cbusMessenger;

        public LayoutController(ICbusMessenger cbusMessenger)
        {
            this.cbusMessenger = cbusMessenger;
            this.cbusMessenger.Open();
        }

        [HttpGet]
        public string Get()
        {
            var f = System.IO.File.ReadAllText("layout.json");
            return f;
        }

        private static Dictionary<ushort, bool> points = new Dictionary<ushort, bool>();
        [HttpPost]
        [Route("turnout")]
        public async Task ToggleTurnout(TurnoutRequest request)
        {

            ushort evNo = request.Id switch
            {
                "PA1" => 1,
                "PA2" => 2,
                "PA3" => 3,
                "PA4" => 4,
                "PA5" => 5
            };
            if (!points.TryGetValue(evNo, out var value))
            {
                value = false;
            }
            value = !value;
            points[evNo] = value;

            if (value)
            {
                await cbusMessenger.SendMessage(new ACON() { NodeNumber = 2, EventNumber = evNo });
            }else
            {
                await cbusMessenger.SendMessage(new ACOF() { NodeNumber = 2, EventNumber = evNo });
            }
        }
    }
}
