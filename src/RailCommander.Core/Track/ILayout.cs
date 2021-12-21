using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RailCommander.Core.Track
{
    public interface ILayout
    {
        IEnumerable<IBlock> Blocks { get; }
        string LayoutData { get; }
        void AddBlock(IBlock block);
        void AddBlocks(IEnumerable<IBlock> block);

        IBlock FindBlock(IBlockEnd blockEnd);

        IEnumerable<IPoint> Points { get; }

        void AddPoint(IPoint point);

        Task LoadLayout(string path);
    }
}
