namespace RailCommander.Core.Track
{
    public class Block:IBlock
    {
        public Block(string name)
        {
            Name = name;
        }

        public IBlockEnd EndA { get; }
        public IBlockEnd EndB { get; }
        public IBlockOccupancy Occupancy { get; }
        public BlockPreferredDirection PreferredDirection { get; }

        public string Name { get; }

    }
}