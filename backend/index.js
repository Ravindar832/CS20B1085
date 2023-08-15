import express from "express";
import { Router } from "express";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const router = Router();

const getToken = async () => {
  const response = await fetch("http://20.244.56.144/train/auth", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      companyName: "Train Central",
      clientID: "ef1aeaca-ad08-468e-b123-59f766ae51b3",
      clientSecret: "AfGRvFobIImUyULf",
      ownerName: "Ravindar Gugulothu",
      ownerEmail: "cs20b1085@iiitdm.ac.in",
      rollNo: "cs20b1085",
    }),
  });
  const result = await response.json();
  const { access_token } = result;
  return access_token;
};

router.get("/trains", async (req, res, next) => {
  const token = await getToken();
  const response = await fetch("http://20.244.56.144/train/trains", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return res.json({
    success: true,
    result,
  });
});

router.get("/trains/:id", async (req, res, next) => {
  const { id } = req.params;
  const token = await getToken();
  const response = await fetch(`http://20.244.56.144/train/trains/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return res.json({
    success: true,
    result,
  });
});

app.use("/", router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server started successfully at port: ${port}`);
});
