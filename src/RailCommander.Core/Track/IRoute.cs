using System.Collections.Generic;

namespace RailCommander.Core.Track
{
    public interface IRoute
    {
        public IEnumerable<IBlock> Blocks { get; }
        public bool IsValid { get; }
    }
}