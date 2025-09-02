import HomeItem from "../components/HomeItem"
import {useSelector} from "react-redux"
const Home=()=>{
  const items=useSelector((store)=>store.items);
  const search = useSelector((store) => store.search);

  const filteredItems = items.filter(
    (item) =>
      item.item_name.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase())
  );

//   console.log('items:', items);
//   console.log('type of items:', typeof items);

  return (
    <main>
        <div className="items-container">
          {filteredItems.length > 0 ? (
          filteredItems.map((item) => <HomeItem key={item.id} item={item} />)
        ) : (
          <p>No products found</p>
        )}
        </div>
    </main>
  );
}

export default Home;