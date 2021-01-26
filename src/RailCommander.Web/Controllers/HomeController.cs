using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RailCommander.Core.Track;
using RailCommander.Web.Models;

namespace RailCommander.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ILayout _layout;

        public HomeController(ILogger<HomeController> logger, ILayout layout)
        {

            if (layout.Blocks.Count() == 0) {
                var b = new Block("Block 1");
                layout.AddBlock(b);
            }
            _layout = layout;

            _logger = logger;
        }

        public IActionResult Index()
        {
            return View(_layout);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
