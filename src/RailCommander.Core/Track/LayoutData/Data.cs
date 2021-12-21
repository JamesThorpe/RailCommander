using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RailCommander.Core.Track.LayoutData
{

    public class Layout
    {
        public Block[] blocks { get; set; }
    }

    public class Block
    {
        public string id { get; set; }
        public string state { get; set; }
        public Section[] sections { get; set; }
    }

    public class Section
    {
        public string type { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int angle { get; set; }
        public string id { get; set; }
        public string position { get; set; }
    }

}
