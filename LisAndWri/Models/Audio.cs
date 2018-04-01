using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LisAndWri.Models
{
       [Table("Audio")]
    public class Audio
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public int Level { get; set; }
        public int Duration { get; set; }
        public DateTime CreateDate { get; set; }
        public int NumTrack { get; set; }

        public virtual ICollection<Track> Tracks { get; set; }
        public virtual ICollection<Score> Scores { get; set; }
    }
}