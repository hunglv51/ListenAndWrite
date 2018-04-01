using LisAndWri.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LisAndWri.Controllers
{
    public class TrackController : Controller
    {
        private AudioContext db = new AudioContext();
        // GET: Track
        public ActionResult Index()
        {
            return View();
        }

        //GET: Track in JSON
        public JsonResult GetTrack(string trackTitle)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Track track = db.Tracks.Where(b => b.AudioTitle == trackTitle).FirstOrDefault();
            return Json(track, JsonRequestBehavior.AllowGet);
        }
    }
}