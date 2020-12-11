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
    }
}