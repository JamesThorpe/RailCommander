using System.Text;

namespace RailCommander.Core.Track
{
    public interface IBlock
    {
        string Name { get; }
        public IBlockEnd EndA { get; }
        public IBlockEnd EndB { get; }
        IBlockOccupancy Occupancy { get; }
    }
}
