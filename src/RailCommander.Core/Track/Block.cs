namespace RailCommander.Core.Track
{
    public class Block:IBlock
    {
        public Block(string name)
        {
            Name = name;
        }
        public bool IsOccupied { get; }
        public IBlockEnd EndA { get; }
        public IBlockEnd EndB { get; }

        public string Name { get; }

    }
}