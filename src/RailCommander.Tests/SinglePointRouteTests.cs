using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Moq;
using RailCommander.Core.Track;
using Xunit;

namespace RailCommander.Tests
{
    /*
             b1-----\-----b2
                     \----b3
    */


    public class SinglePointLayout
    {
        public SinglePointLayout()
        {
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


            Block1 = b1.Object;
            Block2 = b2.Object;
            Block3 = b3.Object;
        }

        

        public IBlock Block1 { get; }
        public IBlock Block2 { get; }
        public IBlock Block3 { get; }
    }

    public class SinglePointData:TheoryData<IEnumerable<IBlock>, bool>
    {
        public SinglePointData()
        {
            var l = new SinglePointLayout();
            Add(new[] {l.Block1, l.Block2}, true);
            Add(new[] {l.Block1, l.Block3}, true);
            Add(new[] {l.Block2, l.Block3}, false);
            Add(new[] {l.Block3, l.Block2}, false);
            Add(new[] {l.Block2, l.Block1}, true);
            Add(new[] {l.Block3, l.Block1}, true);
            Add(new[] {l.Block2, l.Block1, l.Block3}, true);
            Add(new[] {l.Block3, l.Block1, l.Block2}, true);

        }
    }

    public class SinglePointRouteTests
    {

        /*
             Can traverse from b1 to b2 and back
             Can traverse from b1 to b3 and back
             Can traverse from b2 to b3 via b1 and back
             Cannot traverse directly from b2 to b3.

        */

        [Theory]
        [ClassData(typeof(SinglePointData))]
        public void RouteValidity(IEnumerable<IBlock> blocks, bool expectedValid)
        {
            var r = new Route(blocks.ToArray());
            Assert.Equal(expectedValid, r.IsValid);
        }



        [Fact]
        public void FindRouteViaOneOtherBlock()
        {
            var ldata = new SinglePointLayout();

            var l = new Layout();
            l.AddBlock(ldata.Block1);
            l.AddBlock(ldata.Block2);
            l.AddBlock(ldata.Block3);

            var r = Route.FindRoute(l, ldata.Block2, ldata.Block3);

            Assert.Equal(new[] { ldata.Block2, ldata.Block1, ldata.Block3 }, r.Blocks);

        }
    }
}
