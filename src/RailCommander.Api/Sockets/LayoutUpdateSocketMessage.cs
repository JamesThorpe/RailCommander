namespace RailCommander.Api.Sockets
{
    public abstract class LayoutUpdateSocketMessage : SocketMessage
    {

        public LayoutUpdateSocketMessage() : base("layoutupdate")
        {

        }
    }

    public class BlockOccupancyUpdateSocketMessage : LayoutUpdateSocketMessage
    {
        public string BlockId { get; set; }
        public string State { get; set; }
    }

    public class TurnoutStateUpdateSocketMessage : LayoutUpdateSocketMessage
    {
        public string TurnoutId { get; set; }
        public string TurnoutState { get; set; }
    }
}
