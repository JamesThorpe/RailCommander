using System;

namespace RailCommander.Core.Track
{
    public interface IBlockOccupancy
    {
        bool IsOccupied { get; }
        event EventHandler<OccupancyChangedEventArgs> OccupancyChanged;
    }

    public class OccupancyChangedEventArgs:EventArgs
    {
        public bool IsOccupied { get; set; }
    }
}