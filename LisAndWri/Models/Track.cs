using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LisAndWri.Models
{
    [Table("Track")]
    public class Track
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Audio")]
        public int AudioID { get; set; }
        public string AudioTitle { get; set; }
        public string Answer { get; set; }
        public int TimeStart { get; set; }
        public int Duration { get; set; }

    
        public virtual Audio Audio { get; set; }
    }
}