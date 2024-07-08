import express from "express";
import axios from "axios";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(express.json());

const serviceInstances = {};

const roundRobinIndex = {};

const getServiceUrls = async (serviceName) => {
  try {
    const response = await axios.get(
      `${process.env.SERVICE_REGISTRY_URL}/services/${serviceName}`
    );
    return response.data.urls;
  } catch (error) {
    console.error(
      `Error while fetching service urls for ${serviceName}: ${error.message}`
    );
    return [];
  }
};

const getNextServiceUrl = async (serviceName) => {
  if (
    !serviceInstances[serviceName] ||
    serviceInstances[serviceName].length === 0
  ) {
    return null;
  }
  const urls = serviceInstances[serviceName];
  roundRobinIndex[serviceName] =
    (roundRobinIndex[serviceName] + 1) % urls.length;
  return urls[roundRobinIndex[serviceName]];
};

app.use("/:serviceName/*", async (req, res, next) => {
  const { serviceName } = req.params;
  if (
    !serviceInstances[serviceName] ||
    serviceInstances[serviceName].length === 0
  ) {
    const urls = await getServiceUrls(serviceName);
    serviceInstances[serviceName] = urls;
    roundRobinIndex[serviceName] = 0;
  } else {
    return res.status(404).send(`Service ${serviceName} not found`);
  }

  const serviceUrl = getNextServiceUrl(serviceName);
  console.log(`Proxying request to ${serviceUrl}`);

  if (serviceUrl) {
    const endpoint = req.originalUrl.replace(`/${serviceName}`, "");
    createProxyMiddleware({
      target: `${serviceUrl}/${endpoint}`,
      on: {
        proxyReq: (proxyReq, req, res) => {
          if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
          }
        },
      },
    })(req, res, next);
  } else {
    res.status(404).send({ message: `Service ${serviceName} not found` });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Gateway listening on port ${process.env.PORT}`);
});
