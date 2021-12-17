namespace RailCommander.Web.Sockets
{
    public abstract class LayoutUpdateSocketMessage : SocketMessage
    {
        
        public LayoutUpdateSocketMessage() : base("layoutupdate")
        {

        }
    }

    public class BlockOccupancyUpdateSocketMessage:LayoutUpdateSocketMessage
    {
        public string BlockId { get; set; }
        public string State { get;set; }
    }
}
