using System;
using System.Text;

namespace RailCommander.Core.Track
{
    public interface IBlock
    {
        bool IsOccupied { get; }

        public IBlockEnd EndA { get; }
        public IBlockEnd EndB { get; }
        string Name { get; }
    }
}
