using Asgard.Communications;
using Asgard.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RailCommander.Core.Track;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RailCommander.Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class LayoutController : ControllerBase
    {
        private readonly ICbusMessenger cbusMessenger;
        private readonly ILayout layout;

        public LayoutController(ICbusMessenger cbusMessenger, ILayout layout)
        {
            this.cbusMessenger = cbusMessenger;
            this.layout = layout;
            this.cbusMessenger.OpenAsync();
        }

        [HttpGet]
        public string Get()
        {
            return layout.LayoutData;
        }

        private static Dictionary<ushort, bool> points = new Dictionary<ushort, bool>();
        [HttpPost]
        [Route("turnout")]
        public async Task ToggleTurnout(TurnoutRequest request)
        {
            var p = layout.Points.Single(p => p.Id == request.Id);
            p.Direction = p.Direction == PointDirection.Normal ? PointDirection.Reverse : PointDirection.Normal;
            await p.SetDirection();

            /*

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

            if (value) {
                await cbusMessenger.SendMessage(new Acon() { NodeNumber = 2, EventNumber = evNo });
            } else {
                await cbusMessenger.SendMessage(new Acof() { NodeNumber = 2, EventNumber = evNo });
            }*/
        }
    }
}
