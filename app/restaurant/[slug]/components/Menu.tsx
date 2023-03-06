import { MenuCard } from './MenuCard'
import { Item } from "@prisma/client"


const Menu = ({ menu }: { menu: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.length ? menu.map(item => (
            <MenuCard key={item.id} item={item} />
          )) : <h1>No menu for now</h1>}
        </div>
      </div>
    </main>
  )
}

export default Menu