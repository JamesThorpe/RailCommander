namespace RailCommander.Core.Track
{
    public class Block:IBlock
    {
        public bool IsOccupied { get; }
        public IBlockEnd EndA { get; }
        public IBlockEnd EndB { get; }
    }
}