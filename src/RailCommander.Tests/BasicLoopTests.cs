using System.Collections.Generic;
using System.Linq;
using Asgard.Communications;
using Moq;
using RailCommander.Core.Track;
using Xunit;

namespace RailCommander.Tests
{
    public class LoopTestData
    {
        /*
         Preferred direction = clockwise

         /--1---2--\
        6           3
         \--5---4--/

        1->2 preferred
        4->5 preferred

        */

        public IBlock[] Blocks { get; }

        public Layout Layout { get; }

        public LoopTestData()
        {
            var mockBlocks = new Mock<IBlock>[6];

            for (var x = 0; x < 6; x++) {
                mockBlocks[x] = new Mock<IBlock>();
            }

            for (var x = 0; x < 6; x++) {
                var current = mockBlocks[x];
                var next = x < 5 ? mockBlocks[x + 1] : mockBlocks[0];
                var prev = x > 0 ? mockBlocks[x - 1] : mockBlocks[5];

                var endA = new Mock<IBlockEnd>();
                var endB = new Mock<IBlockEnd>();

                endA.SetupGet(e => e.BlockConnections).Returns((() => new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> {{prev.Object.EndB, null}}));
                endB.SetupGet(e => e.BlockConnections).Returns(() => new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> {{next.Object.EndA, null}});

                current.SetupGet(e => e.EndA).Returns(endA.Object);
                current.SetupGet(e => e.EndB).Returns(endB.Object);
                current.SetupGet(e => e.PreferredDirection).Returns(x == 0 || x == 3 ? BlockPreferredDirection.AtoB : BlockPreferredDirection.Either);
                current.SetupGet(e => e.Name).Returns($"Block {x + 1}");
            }

            Blocks = mockBlocks.Select(mb => mb.Object).ToArray();

            Layout = new Layout(Mock.Of<ICbusMessenger>());
            Layout.AddBlocks(Blocks);
        }

    }

    public class BasicLoopTests
    {
        [Fact]
        public void IsLoopTrackLinkedProperly()
        {
            var ltd = new LoopTestData();

            var r = Route.FindRoute(ltd.Layout, ltd.Blocks[0], ltd.Blocks[3]);

            Assert.Equal(new[]{ltd.Blocks[0], ltd.Blocks[1], ltd.Blocks[2], ltd.Blocks[3]}, r.Blocks);
            Assert.True(r.IsValid);
        }

        [Fact]
        public void ShortWayRound()
        {
            var ltd = new LoopTestData();
            var r = Route.FindRoute(ltd.Layout, ltd.Blocks[5], ltd.Blocks[1]);
            Assert.Equal(new[]{ltd.Blocks[5], ltd.Blocks[0], ltd.Blocks[1]}, r.Blocks);
        }

        [Fact]
        public void LongWayRound()
        {
            var ltd = new LoopTestData();
            var r = Route.FindRoute(ltd.Layout, ltd.Blocks[1], ltd.Blocks[5]);
            Assert.Equal(new []{ltd.Blocks[1], ltd.Blocks[2], ltd.Blocks[3], ltd.Blocks[4], ltd.Blocks[5]}, r.Blocks);
        }
    }
}
