﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using LisAndWri.Models;
using LisAndWri.Models.Dao;
using Newtonsoft.Json;

namespace LisAndWri.Controllers
{
    public class AudioController : Controller
    {
        private AudioContext db = new AudioContext();

        // GET: Audios
        public ActionResult Index(string searchString, int page = 1, int pageSize = 3)
        {
            var dao = new AudioDao();
            var model = dao.ListAllPaging(searchString, page, pageSize);

            ViewBag.SearchString = searchString;

            return View(model);
        }

        public ActionResult Move(int page = 1, int pageSize = 5, int id = 1)
        {
            var dao = new AudioDao();
            var model = dao.ListLevelPaging(page, pageSize, id);
            return View(model);
        }

        public ActionResult Mode(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Audio audio = db.Audioes.Find(id);
            if (audio == null)
            {
                return HttpNotFound();
            }
            return View(audio);
        }

        public ActionResult FullMode(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Audio audio = db.Audioes.Find(id);
            if (audio == null)
            {
                return HttpNotFound();
            }
            return View(audio);
        }
        public ActionResult NewMode(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Audio audio = db.Audioes.Find(id);
            if (audio == null)
            {
                return HttpNotFound();
            }
            return View(audio);
        }

        [HttpPost]
        public ActionResult AddScore(Score score)
        {
            if (score != null)
            {
                db.Scores.Add(score);
                db.SaveChanges();
                return Json("Success" + score.ID + " " + score.AudioScore + " " + score.CreateDate + " " + score.Mode + " " + score.AudioID);
            }
            else
            {
                return Json("An Error Has occoured");
            }
        }

        [HttpPost]
        public ActionResult GetLastScores(Score score)
        {
            if (score != null)
            {
                //var query = db.Scores.Where(x => x.AudioID == score.AudioID);
                db.Configuration.ProxyCreationEnabled = false;
                //query = query.Where(x => x.Mode == score.Mode).OrderByDescending(x => x.CreateDate).Take(9);
                var lastScores = (from s in db.Scores where s.AudioID == score.AudioID where s.Mode == score.Mode orderby s.CreateDate select s).Take(14);
                return Json(lastScores);
            }
            else
            {
                return Json("An Error Has occoured");
            }
        }

    }
}
