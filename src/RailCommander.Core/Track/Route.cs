using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;

namespace RailCommander.Core.Track
{
    public class Route:IRoute
    {
        public Route(params IBlock[] blocks)
        {
            _blocks = new List<IBlock>(blocks);
        }

        private List<IBlock> _blocks;
        public IEnumerable<IBlock> Blocks => _blocks;

        public bool IsValid {
            get {
                if (_blocks.Count == 0) {
                    return false;
                }
                
                if (_blocks.Count == 1) {
                    return true;
                }

                for (var x = 0; x <= _blocks.Count - 2; x++) {
                    var currentBlock = _blocks[x];
                    var nextBlock = _blocks[x + 1];

                    static bool CheckConnection(IBlockEnd current, IBlockEnd next)
                    {
                        if (current == null || next == null) {
                            return false;
                        }

                        if (current.BlockConnections == null || 
                            current.BlockConnections.Count == 0 || 
                            next.BlockConnections == null || 
                            next.BlockConnections.Count == 0)
                            return false;

                        return current.BlockConnections.Any(c => c.Key == next) &&
                               next.BlockConnections.Any(c => c.Key == current);
                    }

                    if (!CheckConnection(currentBlock.EndB, nextBlock.EndA) && !CheckConnection(currentBlock.EndA, nextBlock.EndA) &&
                        !CheckConnection(currentBlock.EndB, nextBlock.EndB) && !CheckConnection(currentBlock.EndA, nextBlock.EndB)) {
                        return false;
                    }
                }

                return true;

            }
        }

        public static IRoute FindRoute(ILayout layout, IBlock start, IBlock destination)
        {
            if (!layout.Blocks.Contains(start) || !layout.Blocks.Contains(destination)) {
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
                    var next = layout.FindBlock(c);

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