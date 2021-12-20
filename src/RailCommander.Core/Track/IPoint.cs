using Asgard.Communications;
using Asgard.Data;
using System;
using System.Threading.Tasks;

namespace RailCommander.Core.Track
{
    public enum PointDirection
    {
        Normal,
        Reverse
    }
    public interface IPoint
    {
        public PointDirection Direction { get; set; }
    }

    public class Point : IPoint
    {
        private readonly ICbusMessenger cbusMessenger;
        private PointDirection direction;

        public ushort NodeNumber { get; set; }
        public ushort EventNumber { get; set; }
        public bool IsReversed { get; set; }

        public PointDirection Direction {
            get => direction; set {
                direction = value;
                //TODO: losing async/await here
                _ = SetDirection();
            }
        }

        public Point(ICbusMessenger cbusMessenger)
        {
            this.cbusMessenger = cbusMessenger;
        }

        public async Task SetDirection()
        {
            ICbusOpCode msg = null;

            if ((Direction == PointDirection.Normal && !IsReversed) || (Direction == PointDirection.Reverse && IsReversed)) {
                msg = new ACON() { NodeNumber = NodeNumber, EventNumber = EventNumber };
            } else if ((Direction == PointDirection.Reverse && !IsReversed) || (Direction == PointDirection.Normal && IsReversed)) {
                msg = new ACOF() { NodeNumber = NodeNumber, EventNumber = EventNumber };
            } else {
                throw new Exception("Invalid point state");
            }

            await cbusMessenger.SendMessage(msg);
        }
    }
}