import { parse } from "url";
import got from "got";
import cheerio from "cheerio";

const resolveURL = (url, path) => {
  if (/^\//.test(path)) {
    if (/^\/\//.test(path)) {
      return `https:${path}`;
    }
    return `${url}${path}`;
  }
  return path;
};

const fourOFour = res => {
  res.writeHead(404, {});
  res.end();
};

export default async (req, res) => {
  const { query } = parse(req.url, true);
  const { site = "https://padyogi.com" } = query;
  const { hostname, protocol } = parse(site, true);
  const url = `${protocol}//${hostname}`;
  let $;
  let resp;
  try {
    resp = await got({
      url: url
    });
    $ = cheerio.load(resp.body);
  } catch (e) {
    resp = null;
  }

  if (!resp) {
    return fourOFour(res);
  }

  const meta = {};

  $("meta").each(function(i, elem) {
    const $this = $(this);
    const key =
      $this.attr("rel") || $this.attr("name") || $this.attr("itemprop");
    meta[key] = resolveURL(url, $this.attr("content"));
  });

  $('link[rel="icon"]').each(function(i, elem) {
    const $this = $(this);
    const key = `${$this.attr("type")}-${$this.attr("sizes") || "none"}`;
    meta[key] = resolveURL(url, $this.attr("href"));
  });

  $('link[rel="shortcut icon"]').each(function(i, elem) {
    const $this = $(this);
    const key = $this.attr("rel");
    meta[key] = resolveURL(url, $this.attr("href"));
  });

  const knownNames = [
    "image/png-32x32",
    "image/png-16x16",
    "image/png-none",
    "image/x-icon-none",
    "image/ico-none",
    "image",
    "shortcut icon"
  ];

  const iconURL = knownNames.reduce((image, key) => {
    if (!image && meta[key]) {
      return meta[key];
    }
    return image;
  }, null);

  if (iconURL) {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      await got({
        url: iconURL,
        stream: true
      }).pipe(res);
    } catch (e) {
      fourOFour(res);
    }
    return;
  }
  return fourOFour(res);
};
