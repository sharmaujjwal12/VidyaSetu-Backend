exports.getLatestNews = async (req, res) => {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=pub_c8391e6e1fc64a73ae12963324d3f98f&country=in&language=en`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching news" });
  }
};