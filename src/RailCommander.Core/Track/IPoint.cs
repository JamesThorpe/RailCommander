namespace RailCommander.Core.Track
{
    public enum PointDirection
    {
        Normal,
        Reverse
    }
    public interface IPoint
    {
        public PointDirection Direction { get; }
    }
}