using Asgard.Communications;
using Microsoft.AspNetCore.Mvc;
using RailCommander.Api.Models;
using RailCommander.Core.Track;

namespace RailCommander.Api.Controllers
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

            if (layout.Points.Count() == 0) {
                layout.LoadLayout("bin/debug/net6.0/layout.json");
            }
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
        }
    }
}
