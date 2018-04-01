using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LisAndWri.Models
{   
    [Table("Score")]
    public class Score
    {
        [Key]
        public int ID { get; set; }
        [ForeignKey("Audio")]
        public int AudioID { get; set; }
        public int AudioScore { get; set; }
        public bool Mode { get; set; }
        public DateTime CreateDate { get; set; }

        public virtual Audio Audio { get; set; }
    }
}