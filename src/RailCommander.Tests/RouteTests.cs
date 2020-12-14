using System;
using System.Collections.Generic;
using Moq;
using RailCommander.Core.Track;
using Xunit;

namespace RailCommander.Tests
{
    public class RouteTests
    {
        [Fact]
        public void IsEmptyRouteInvalid()
        {
            var r = new Route();
            Assert.False(r.IsValid);
        }

        [Fact]
        public void IsSingleBlockRouteValid()
        {
            var b = new Mock<IBlock>();
            var r = new Route(b.Object);
            Assert.True(r.IsValid);
        }

        [Fact]
        public void IsRouteWithTwoUnrelatedBlocksInvalid()
        {
            var b = new Mock<IBlock>();
            var b2 = new Mock<IBlock>();
            var r = new Route(b.Object, b2.Object);
            Assert.False(r.IsValid);
        }

        [Fact]
        public void IsSimpleRouteWithTwoBlocksValid()
        {
            /*
            
            b1 ----- b2

            Can go back and forth
            
            */
            var b1 = new Mock<IBlock>();
            var b1e = new Mock<IBlockEnd>();
            var b2 = new Mock<IBlock>();
            var b2e = new Mock<IBlockEnd>();

            b1.SetupGet(b => b.EndB).Returns(b1e.Object);
            b2.SetupGet(b => b.EndA).Returns(b2e.Object);

            b1e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> {{b2e.Object, null}});
            b2e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> {{b1e.Object, null}});

            var r = new Route(b1.Object, b2.Object);

            Assert.True(r.IsValid);
        }

        [Fact]
        public void FindSimpleRouteInOneBlock()
        {
            var b = new Mock<IBlock>();
            var l = new Layout();
            l.AddBlock(b.Object);

            var r = l.FindRoute(b.Object, b.Object);

            Assert.Equal(new[] { b.Object }, r.Blocks);
        }

        [Fact]
        public void FindSimpleRouteBetweenTwoBlocks()
        {
            /*
            
            b1 ----- b2

            Can go back and forth
            
            */
            var b1 = new Mock<IBlock>();
            var b1e = new Mock<IBlockEnd>();
            var b2 = new Mock<IBlock>();
            var b2e = new Mock<IBlockEnd>();

            b1.SetupGet(b => b.EndB).Returns(b1e.Object);
            b2.SetupGet(b => b.EndA).Returns(b2e.Object);

            b1e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> { { b2e.Object, null } });
            b2e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> { { b1e.Object, null } });

            var l = new Layout();
            l.AddBlock(b1.Object);
            l.AddBlock(b2.Object);

            var r = l.FindRoute(b1.Object, b2.Object);
            Assert.Equal(new[] { b1.Object, b2.Object }, r.Blocks);
        }

    }
}
