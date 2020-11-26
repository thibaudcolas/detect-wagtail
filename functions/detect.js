const https = require("https");

const renditions = {
  // Optimized for real-world relevance, with as few false positives as possible, but still some.
  strict: /(\.[a-z]+|\/media)(\/[\w-]+)?\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
  // Very specific matching. No avoidable false positives.
  strictest: /\/media\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height|scale)-\d+|original)\.)/,
  // Lax matching, with widespread false positives.
  lax: /\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
  // Very lax matching based on rendition suffixes or original_images folder only.
  laxest: /(\/original_images\/|\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
};

const req = (url) => {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { timeout: 3000 }, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(responseBody);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
};

exports.handler = async function detectWagtail({ queryStringParameters }) {
  const { url } = queryStringParameters;

  try {
    const res = await req(url);
    let code;

    if (renditions.strictest.test(res)) {
      code = "strictest";
    } else if (renditions.strict.test(res)) {
      code = "strict";
    } else if (renditions.lax.test(res)) {
      code = "lax";
    } else if (renditions.laxest.test(res)) {
      code = "laxest";
    } else {
      code = "nope";
    }

    return {
      statusCode: 200,
      headers: {
        "cache-control": `public, max-age=${60 * 60 * 24}`,
      },
      body: JSON.stringify(
        {
          target: url,
          code,
        },
        null,
        2,
      ),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          target: url,
          code: "error",
        },
        null,
        2,
      ),
    };
  }
};
