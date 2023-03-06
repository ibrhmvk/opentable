import { RestaurantNavbar } from "../components/RestaurantNavbar"
import Menu from "../components/Menu"
import { PrismaClient, Item } from "@prisma/client"

const prisma = new PrismaClient()

const fetchMenu = async (slug: string): Promise<Item[]> => {
    const menu = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            items: true
        }
    })
    if (!menu) {
        throw new Error()
    }
    return menu.items
}
export default async function RestaurantMenu({ params }: { params: { slug: string } }) {
    const menu = await fetchMenu(params.slug)
    return (
        <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavbar slug={params.slug} />
            <Menu menu={menu} />
        </div>
    )
}