using System.Collections.Generic;
using System.Linq;

namespace RailCommander.Core.Track
{
    public class Layout : ILayout
    {
        private List<IBlock> _blocks = new List<IBlock>();


        public IEnumerable<IBlock> Blocks => _blocks;

        public void AddBlock(IBlock block)
        {
            _blocks.Add(block);
        }

        private IBlock FindBlock(IBlockEnd blockEnd)
        {
            return _blocks.Single(b => b.EndA == blockEnd || b.EndB == blockEnd);
        }

        public IRoute FindRoute(IBlock start, IBlock destination)
        {
            if (!_blocks.Contains(start) || !_blocks.Contains(destination)) {
                throw new System.Exception("Block is not in layout");
            }

            if (start == destination) {
                return new Route(start);
            }

            var visited = new List<IBlock>();
            var toCheck = new Queue<IBlock>();
            var path = new Dictionary<IBlock, IBlock>();

            visited.Add(start);
            toCheck.Enqueue(start);

            while (toCheck.Count > 0) {
                var current = toCheck.Dequeue();
                var connections = new List<IBlockEnd>();
                if (current.EndA?.BlockConnections != null) {
                    connections.AddRange(current.EndA.BlockConnections.Keys);
                }
                if (current.EndB?.BlockConnections != null) {
                    connections.AddRange(current.EndB.BlockConnections.Keys);
                }

                foreach (var c in connections) {
                    var next = FindBlock(c);
                    if (!visited.Contains(next)) {
                        visited.Add(next);
                        path.Add(next, current);
                        toCheck.Enqueue(next);
                    }
                }
            }

            if (!path.ContainsKey(destination)) {
                return null;
            }

            var blocks = new List<IBlock>();
            var b = destination;
            while (path.ContainsKey(b)) {
                blocks.Add(b);
                b = path[b];
            }
            blocks.Add(b);

            blocks.Reverse();
            return new Route(blocks.ToArray());
        }

    }
}
