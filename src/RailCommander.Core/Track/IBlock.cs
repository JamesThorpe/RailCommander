namespace RailCommander.Core.Track
{
    public enum BlockPreferredDirection
    {
        Either,
        AtoB,
        BtoA
    }

    public interface IBlock
    {
        string Name { get; }
        public IBlockEnd EndA { get; }
        public IBlockEnd EndB { get; }
        IBlockOccupancy Occupancy { get; }
        BlockPreferredDirection PreferredDirection { get; }
    }
}
