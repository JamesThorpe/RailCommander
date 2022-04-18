using Asgard.Communications;
using Asgard.EngineControl;
using System.Collections.Concurrent;
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
            var session = await GetSession(address);
            byte s = (byte)speed;
            if (forwards) {
                s += 128;
            }
            await session.SetSpeedAndDirection(s);
        }

        public async Task SetEngineFunction(int address, int index, bool on)
        {
            var session = await GetSession(address);
            await session.SetFunction((byte)index, on);
        }

        private async Task<IEngineSession> GetSession(int address)
        {
            if (!sessions.TryGetValue(address, out IEngineSession session)) {
                session = await engineManager.RequestEngineSession((ushort)address);
                if (sessions.TryAdd(address, session)) {
                    session.SessionCancelled += (s, e) => {
                        sessions.TryRemove(address, out _);
                    };
                }
            }

            return session;
        }
    }
}
