using Asgard.Communications;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RailCommander.Core.Track
{
    public class Layout : ILayout
    {
        private readonly ICbusMessenger cbusMessenger;
        private List<IBlock> _blocks = new List<IBlock>();
        private List<IPoint> _points = new List<IPoint>();

        public string LayoutData { get; private set; }

        public Layout(ICbusMessenger cbusMessenger)
        {
            this.cbusMessenger = cbusMessenger;
            //TODO: shouldn't be opening in constructor
            this.cbusMessenger.OpenAsync();
        }

        public IEnumerable<IBlock> Blocks => _blocks;

        public IEnumerable<IPoint> Points => _points;

        public void AddBlock(IBlock block)
        {
            _blocks.Add(block);
        }

        public void AddBlocks(IEnumerable<IBlock> blocks)
        {
            foreach (var b in blocks) {
                AddBlock(b);
            }
        }

        public void AddPoint(IPoint point)
        {
            _points.Add(point);
        }

        public IBlock FindBlock(IBlockEnd blockEnd)
        {
            return _blocks.Single(b => b.EndA == blockEnd || b.EndB == blockEnd);
        }

        public async Task LoadLayout(string path)
        {
            var data = await File.ReadAllTextAsync(path);
            LayoutData = data;
            var l = JsonConvert.DeserializeObject<LayoutData.Layout>(data);

            foreach(var block in l.blocks) {
                foreach(var section in block.sections) {
                    if (section.type.StartsWith("turnout")) {
                        var p = new Core.Track.Point(cbusMessenger);
                        p.NodeNumber = 2;
                        p.EventNumber = ushort.Parse(section.id[2..]);
                        p.Id = section.id;
                        if (p.EventNumber == 4) {
                            p.IsReversed = true;
                        }
                        AddPoint(p);
                        await p.SetDirection(PointDirection.Normal);
                    }
                }
            }
        }



    }
}
