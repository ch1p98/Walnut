const db = require("../service/db");

const getPost = async (info) => {
  const {
    category = "trendy",
    page = 0,
    numsOfPage = 6,
    keyword = "",
    id = "",
  } = info;
  const prepared = [];
  let categoryFilter = "";
  if (category !== "all") {
    categoryFilter = "WHERE p.category = ?";
    prepared.push(category);
  }
  let keywordFilter = "";
  if (keyword !== "") {
    keywordFilter = "WHERE p.title LIKE CONCAT( '%',?,'%')";
    prepared.push(keyword);
  }
  let idFilter = "";
  if (id !== "") {
    idFilter = "WHERE p.id = ?";
    prepared.push(id);
  }
  const sql = `SELECT p.id, p.category, p.title, p.description, p.price, p.texture, p.wash, p.place, p.note, p.story,
  group_concat(DISTINCT JSON_OBJECT('name', v.color_name,'code',  c.code)) colors,
  group_concat(DISTINCT v.size SEPARATOR ", ") size,
  group_concat(DISTINCT JSON_OBJECT('size',v.size,'color_code', c.code,'stock', v.stock) SEPARATOR ", ") variants,
  p.main_image,
  group_concat(DISTINCT i.url SEPARATOR ", ") images
  FROM product p 
  LEFT JOIN variant v ON p.id = v.product_id
  LEFT JOIN image i ON p.id = i.product_id
  LEFT JOIN (SELECT * FROM variant v LEFT JOIN color c ON c.name=v.color_name) c ON c.name = v.color_name
  LEFT JOIN (SELECT c.name, c.code FROM color c) cc ON cc.name = v.color_name 
  ${categoryFilter}
  ${keywordFilter}
  ${idFilter}
  GROUP BY p.title ORDER BY p.id LIMIT ? offset ?`;
  prepared.push(numsOfPage + 1);
  prepared.push(page * numsOfPage);
  const results = await db.execute(sql, prepared);

  // array formation
  parseToJson(results);
  for (const result of results) {
    result.main_image = `${IMAGE_URL}/${IMAGE_FOLDER}/${result.main_image}`;
    for (let i = 0; i < result.images.length; i++) {
      result.images[i] = `${IMAGE_URL}/${IMAGE_FOLDER}/${result.images[i]}`;
    }
  }
  return results;
};

module.exports = {
  getPost,
};
