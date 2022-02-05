namespace RailCommander.Web.Models
{
    public class SpeedRequest
    {
        public int Address { get; set; }
        public int Speed { get; set; }
        public bool Forwards { get; set; }
    }

    public class FunctionRequest
    {
        public int Address { get; set; }
        public int Index { get; set; }
        public bool On { get; set; }
    }
}
