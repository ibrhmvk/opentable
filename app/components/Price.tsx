import { PRICE } from "@prisma/client";

export const Price: React.FC<{ price: PRICE }> = ({ price }) => {

    const renderPrice = () => {

        if (price === PRICE.CHEAP) {
            return (
                <>
                    <span className="font-bold">$$</span><span className=" text-gray-500">$$</span>
                </>
            )
        } else if (price === PRICE.REGULAR) {
            return (
                <>
                    <span className="font-bold">$$$</span><span className=" text-gray-500">$</span>
                </>
            )
        } else {
            return (
                <>
                    <span className="font-bold">$$$$</span>
                </>
            )
        }
    }
    return (<p className="mr-3">
        {renderPrice()}
    </p>
    )
}
