using System.Collections.Generic;
using System.Linq;

namespace RailCommander.Core.Track
{
    public class Layout : ILayout
    {
        private List<IBlock> _blocks = new List<IBlock>();
        private List<IPoint> _points = new List<IPoint>();


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
            var path = new Dictionary<IBlock, (IBlock block, bool wrongway)>();

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

                    var wasAToB = current.EndB?.BlockConnections?.ContainsKey(c) ?? false;
                    var wrongWay = false;
                    switch (current.PreferredDirection) {
                        case BlockPreferredDirection.AtoB when !wasAToB:
                        case BlockPreferredDirection.BtoA when wasAToB:
                            wrongWay = true;
                            break;
                    }


                    if (visited.Contains(next) && path.ContainsKey(next)) {
                        var wwcn = 0;
                        var bb = next;
                        while (path.ContainsKey(bb)) {
                            if (path[bb].wrongway) {
                                wwcn++;
                            }

                            bb = path[bb].block;
                        }

                        var wwcc = 0;
                        bb = current;
                        while (path.ContainsKey(bb)) {
                            if (path[bb].wrongway) {
                                wwcc++;
                            }

                            bb = path[bb].block;
                        }

                        if (wwcc < wwcn) {
                            path[next] = (current, wrongWay);
                        }
                    }
                    
                    
                    if (!visited.Contains(next)) {
                        visited.Add(next);
                        path.Add(next, (current, wrongWay));
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
                b = path[b].block;
            }
            blocks.Add(b);

            blocks.Reverse();
            return new Route(blocks.ToArray());
        }


    }
}
