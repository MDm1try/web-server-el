export default async function (req, res) {
  try {
    // const {
    //   name,
    //   cadNum,
    //   area,
    //   type,
    //   purpose,
    //   cost,
    //   currency,
    //   description,
    //   shape,
    //   medias,
    // } = req.body;
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
