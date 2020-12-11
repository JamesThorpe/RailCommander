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
        public void IsRouteWithThreeBlocksAndOnePointValid()
        {
            /*
            b1-----\-----b2
                    \----b3

            Can traverse from b1 to b2 and back
            Can traverse from b1 to b3 and back
            Can traverse from b2 to b3 via b1 and back
            Cannot traverse directly from b2 to b3.
             
             */


            var b1 = new Mock<IBlock>();
            var b1e = new Mock<IBlockEnd>();
            var b2 = new Mock<IBlock>();
            var b2e = new Mock<IBlockEnd>();
            var b3 = new Mock<IBlock>();
            var b3e = new Mock<IBlockEnd>();

            var p = new Mock<IPoint>();

            b1.SetupGet(b => b.EndB).Returns(b1e.Object);
            b2.SetupGet(b => b.EndA).Returns(b2e.Object);
            b3.SetupGet(b => b.EndA).Returns(b3e.Object);

            b1e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> {
                {b2e.Object, new Dictionary<IPoint, PointDirection> {{p.Object, PointDirection.Normal}}},
                {b3e.Object, new Dictionary<IPoint, PointDirection> {{p.Object, PointDirection.Reverse}}}
            });


            b2e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> { { b1e.Object, null } });
            b3e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> { { b1e.Object, null } });

            var r1 = new Route(b1.Object, b2.Object);
            var r2 = new Route(b1.Object, b3.Object);

            var r3 = new Route(b2.Object, b3.Object);
            var r4 = new Route(b3.Object, b2.Object);

            var r5 = new Route(b2.Object, b1.Object);
            var r6 = new Route(b3.Object, b1.Object);

            var r7 = new Route(b2.Object, b1.Object, b3.Object);
            var r8 = new Route(b3.Object, b1.Object, b2.Object);

            Assert.True(r1.IsValid);
            Assert.True(r2.IsValid);

            Assert.False(r3.IsValid);
            Assert.False(r4.IsValid);

            Assert.True(r5.IsValid);
            Assert.True(r6.IsValid);

            Assert.True(r7.IsValid);
            Assert.True(r8.IsValid);

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


        [Fact]
        public void FindRouteViaOneOtherBlock()
        {
            /*
            b1-----\-----b2
                    \----b3

            Can traverse from b1 to b2 and back
            Can traverse from b1 to b3 and back
            Can traverse from b2 to b3 via b1 and back
            Cannot traverse directly from b2 to b3.
             
             */


            var b1 = new Mock<IBlock>();
            var b1e = new Mock<IBlockEnd>();
            var b2 = new Mock<IBlock>();
            var b2e = new Mock<IBlockEnd>();
            var b3 = new Mock<IBlock>();
            var b3e = new Mock<IBlockEnd>();

            var p = new Mock<IPoint>();

            b1.SetupGet(b => b.EndB).Returns(b1e.Object);
            b2.SetupGet(b => b.EndA).Returns(b2e.Object);
            b3.SetupGet(b => b.EndA).Returns(b3e.Object);

            b1e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> {
                {b2e.Object, new Dictionary<IPoint, PointDirection> {{p.Object, PointDirection.Normal}}},
                {b3e.Object, new Dictionary<IPoint, PointDirection> {{p.Object, PointDirection.Reverse}}}
            });


            b2e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> { { b1e.Object, null } });
            b3e.SetupGet(be => be.BlockConnections).Returns(new Dictionary<IBlockEnd, Dictionary<IPoint, PointDirection>> { { b1e.Object, null } });

            var l = new Layout();
            l.AddBlock(b1.Object);
            l.AddBlock(b2.Object);
            l.AddBlock(b3.Object);

            var r = l.FindRoute(b2.Object, b3.Object);

            Assert.Equal(new[] { b2.Object, b1.Object, b3.Object }, r.Blocks);



        }
    }
}
