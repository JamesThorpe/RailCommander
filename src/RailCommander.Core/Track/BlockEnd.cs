using System.Collections.Generic;

namespace RailCommander.Core.Track
{
    public class BlockEnd : IBlockEnd
    {
        private List<IPoint> _points;

        public BlockEnd()
        {
            BlockConnections = new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>>();
            _points = new List<IPoint>();
        }
        public Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> BlockConnections { get; }
        
        public void AddConnection(IBlockEnd target, Dictionary<IPoint, PointDirection> requiredPointDirections)
        {
            BlockConnections.Add(target, requiredPointDirections);
        }
    }
}