using System.Collections.Generic;

namespace RailCommander.Core.Track
{
    public interface IBlockEnd
    {
        public Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> BlockConnections { get; }
    }
}