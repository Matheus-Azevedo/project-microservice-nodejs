import express from "express";

const app = express();

app.use(express.json());

const service = {};

app.post("/register", (req, res) => {
  const { name, url } = req.body;

  if (!service[name]) {
    service[name] = [];
  }

  if (!service[name].includes(url)) {
    service[name].push(url);
    res
      .status(201)
      .send(`Service ${name} registered successfully at URL "${url}"`);
    return;
  }
  res.status(400).send("Service already registered");
});

app.get("/services/:name", (req, res) => {
  const { name } = req.params;
  const urls = service[name];
  if (!urls && urls.length === 0) {
    res.status(404).send("Service not found");
    return;
  }
  res.status(200).send({ urls });
});

app.listen(process.env.PORT, () => {
  console.log(`Service Registry is running on port ${process.env.PORT}`);
});
