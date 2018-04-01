using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisAndWri.Models
{

    public class AudioInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<AudioContext>
    {
        protected override void Seed(AudioContext context)
        {
            var audios = new List<Audio>
            {
            new Audio{Title="ETS 2016 - Test 1 - Câu 9",Level=10,Duration=18,CreateDate=DateTime.Parse("2018-09-01"),NumTrack=4},
            new Audio{Title="ETS 2016 - Test 1 - Câu 10",Level=10,Duration=17,CreateDate=DateTime.Parse("2018-09-03"),NumTrack=4},
            };

            audios.ForEach(s => context.Audioes.Add(s));
            context.SaveChanges();
            var tracks = new List<Track>
            {
            new Track{AudioID=1,AudioTitle="ETS 2016 - Test 1 - Câu 9_track1",Answer="An employee is organizing a shoe display",TimeStart=0,Duration=5},
            new Track{AudioID=1,AudioTitle="ETS 2016 - Test 1 - Câu 9_track2",Answer="Merchandise is being put into a bag",TimeStart=5,Duration=4},
            new Track{AudioID=1,AudioTitle="ETS 2016 - Test 1 - Câu 9_track3",Answer="Some footwear is being scanned by a cashier",TimeStart=9,Duration=5},
            new Track{AudioID=1,AudioTitle="ETS 2016 - Test 1 - Câu 9_track4",Answer="A customer is trying on a pair of shoes",TimeStart=14,Duration=4},

            new Track{AudioID=2,AudioTitle="ETS 2016 - Test 1 - Câu 10_track1",Answer="Trees are growing under an archway",TimeStart=0,Duration=4},
            new Track{AudioID=2,AudioTitle="ETS 2016 - Test 1 - Câu 10_track2",Answer="Passengers are waiting to board of train",TimeStart=4,Duration=4},
            new Track{AudioID=2,AudioTitle="ETS 2016 - Test 1 - Câu 10_track3",Answer="A high wall runs alongside the train tracks",TimeStart=8,Duration=5},
            new Track{AudioID=2,AudioTitle="ETS 2016 - Test 1 - Câu 10_track4",Answer="A train is about to go over a bridge",TimeStart=13,Duration=4},
            };
            tracks.ForEach(s => context.Tracks.Add(s));
            context.SaveChanges();
            var scores = new List<Score>
            {
            new Score{AudioID=1,AudioScore=10,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=100,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=60,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=53,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=42,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=39,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=84,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=33,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=0,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=90,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=1,AudioScore=15,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },

            new Score{AudioID=2,AudioScore=100,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=62,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=26,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=36,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=49,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=13,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=20,Mode = true,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=10,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=0,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=59,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=87,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },
            new Score{AudioID=2,AudioScore=97,Mode = false,CreateDate=DateTime.Parse("2018-09-03") },

            };
            scores.ForEach(s => context.Scores.Add(s));
            context.SaveChanges();
        }
    }

}