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
        string Id { get; }
        PointDirection Direction { get; }
        Task SetDirection(PointDirection direction);
    }

    public class Point : IPoint
    {
        private readonly ICbusMessenger cbusMessenger;
        private PointDirection _direction;

        public ushort NodeNumber { get; set; }
        public ushort EventNumber { get; set; }
        public bool IsReversed { get; set; }

        public string Id { get; set; }

        public PointDirection Direction {
            get => _direction;
        }

        public Point(ICbusMessenger cbusMessenger)
        {
            this.cbusMessenger = cbusMessenger;
        }

        public async Task SetDirection(PointDirection direction)
        {
            _direction = direction;
            ICbusOpCode msg;
            if ((Direction == PointDirection.Normal && !IsReversed) || (Direction == PointDirection.Reverse && IsReversed)) {
                msg = new AccessoryOn() { NodeNumber = NodeNumber, EventNumber = EventNumber };
            } else if ((Direction == PointDirection.Reverse && !IsReversed) || (Direction == PointDirection.Normal && IsReversed)) {
                msg = new AccessoryOff() { NodeNumber = NodeNumber, EventNumber = EventNumber };
            } else {
                throw new Exception("Invalid point state");
            }

            await cbusMessenger.SendMessage(msg);
        }
    }
}