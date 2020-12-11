using System;
using System.Collections.Generic;
using System.Text;

namespace RailCommander.Core.Track
{
    public interface ILayout
    {
        IEnumerable<IBlock> Blocks { get; }

        void AddBlock(IBlock block);
    }
}
