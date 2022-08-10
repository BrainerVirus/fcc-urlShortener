import ShortUrl from "../models/shortUrl.js";
import dns from "dns";
import urlParser from "url";

export const createShortUrl = async (req, res) => {
  try {
    var valid = /^(https):\/\/[^ "]+$/;
    const url = req.body.url;
    const cleanUrlFronHtpps = url.replace(/^(https)?:\/\//, "");
    dns.lookup(urlParser.parse(url).hostname, (err, address, family) => {
      // if (!valid.test(url)) return res.json({ error: "invalid url" });
      if (!address) res.json({ error: "invalid url" });
      const info = {
        original_url: req.body.url,
        short_url: Math.floor(Math.random() * 1000000),
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
    const url = await ShortUrl.findOne({ short_url: shortUrl });
    res.redirect(url.original_url);
  } catch (error) {
    res.json({ error: error });
  }
};
