using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisAndWri.Models.Dao
{
    public class AudioDao
    {
        AudioContext db = null;
        public AudioDao()
        {
            db = new AudioContext();
        }

        public IEnumerable<Audio> ListAllPaging(string searchString, int page, int pageSize)
        {
            IQueryable<Audio> model = db.Audioes;
            if (!string.IsNullOrEmpty(searchString))
            {
                model = model.Where(x => x.Title.Contains(searchString));
            }

            return model.OrderByDescending(x => x.CreateDate).ToPagedList(page, pageSize);
        }

        public IEnumerable<Audio> ListLevelPaging(int page, int pageSize, int id)
        {
            IQueryable<Audio> model = db.Audioes;
            string lv = id.ToString();
            if (!string.IsNullOrEmpty(lv))
            {
                // model = model.Where(x => x.Level.Contains(lv));
                model = from s in db.Audioes
                        where s.Level == id
                        select s;
            }

            return model.OrderByDescending(x => x.CreateDate).ToPagedList(page, pageSize);
        }

        public Audio GetById(string name)
        {
            return db.Audioes.SingleOrDefault(x => x.Title == name);
        }

        public Audio ViewDetail(int id)
        {
            return db.Audioes.Find(id);
        }

    }

}