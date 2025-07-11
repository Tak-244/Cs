export default async function handler(req, res) {
  const { base, info } = req.query;

  const url = `https://voidsearch.localto.net/api/search?Access-Key=WM3t-Av5u-thfP-GiBV-sM3B&Base=${base}&Info=${info}`;

  try {
    const resposta = await fetch(url);
    const json = await resposta.json();
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao consultar API", detalhes: err.message });
  }
}
