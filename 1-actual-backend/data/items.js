const fs = require('node:fs/promises');

async function getStoredItems() {
  const rawFileContent = await fs.readFile('items.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedItems = data.items ?? [];
//   If data.items exists and is not null or undefined, storedItems will be assigned the value of data.items.
// If data.items is null or undefined, storedItems will be assigned an empty array ([]).
  return storedItems;
}

function storeItems(items) {
  return fs.writeFile('items.json', JSON.stringify({ items: items || [] }));
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;