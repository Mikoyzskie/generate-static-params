
import { productSlug } from "@/lib/productSlug"


type Params = {
    params: {
        category: string
        subcategory: string
        product: string
        id: string
    }
}

export default async function Page({ params: { category, subcategory, product, id } }: Params) {

    await productSlug(category, subcategory, product, id)

    return (
        <div>
            <h1>yey</h1>
        </div>
    )
}

