using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace LisAndWri.Models
{
    public class AudioContext : DbContext
    {

        public AudioContext() : base("AudioManagement")
        {
        }

        public DbSet<Audio> Audioes { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Score> Scores { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}