import ShortUrl from "../models/shortUrl.js";
import dns from "dns";

export const createShortUrl = async (req, res) => {
  try {
    var valid = /^(ftp|http|https):\/\/[^ "]+$/;
    const url = req.body.url;
    const cleanUrlFronHtpps = url.replace(/^(ftp|http|https)?:\/\//, "");
    dns.lookup(cleanUrlFronHtpps, (err, address, family) => {
      if (!valid.test(url)) return res.json({ error: "invalid url" });
      if (err) return res.json({ error: "URL Does not exist" });
      const info = {
        url: req.body.url,
        shortUrl: Math.floor(Math.random() * 1000000),
      };
      const urlToShort = ShortUrl.create(info).then(() => {
        console.log("this is the url:", req.body.url);
        res.json(info);
      });
    });
  } catch (error) {
    res.json({ error: error });
  }
};

export const getShortUrl = async (req, res) => {
  try {
    const shortUrl = req.params.id;
    const url = await ShortUrl.findOne({ shortUrl: shortUrl });
    res.redirect(url.url);
  } catch (error) {
    res.json({ error: error });
  }
};
