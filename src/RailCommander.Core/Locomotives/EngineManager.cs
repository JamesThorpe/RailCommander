using Asgard.Communications;
using Asgard.EngineControl;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RailCommander.Core.Locomotives
{
    public class EngineManager
    {
        private readonly ICbusMessenger cbusMessenger;
        private readonly Asgard.EngineControl.EngineManager engineManager;

        private readonly ConcurrentDictionary<int, IEngineSession> sessions;

        public EngineManager(ICbusMessenger cbusMessenger)
        {
            this.cbusMessenger = cbusMessenger;
            this.engineManager = new Asgard.EngineControl.EngineManager(this.cbusMessenger);

            sessions = new ConcurrentDictionary<int, IEngineSession>();
        }

        public async Task SetEngineSpeed(int address, int speed, bool forwards)
        {
            if (!sessions.TryGetValue(address, out IEngineSession session)) {
                session = await engineManager.RequestEngineSession((ushort)address);
                if (sessions.TryAdd(address, session)) {
                    session.SessionCancelled += (s, e) => {
                        sessions.TryRemove(address, out _);
                    };
                }
            }
            byte s = (byte)speed;
            if (forwards) {
                s += 128;
            }
            await session.SetSpeedAndDirection(s);
        }
    }
}
