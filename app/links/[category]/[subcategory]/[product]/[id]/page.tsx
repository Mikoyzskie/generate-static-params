import { getCategory } from "@/lib/getCategories"
import { getSubcategory, fetchSubByName } from "@/lib/getSubcategories"
import { getProduct, getProducts } from "@/lib/getProducts"
import { notFound } from "next/navigation"

const slugify = require('slugify');
const unslug = (word: string) => word.split('-').join(' ')

type Params = {
    params: {
        category: string
        subcategory: string
        product: string
        id: string
    }
}

export default async function Page({ params: { category, subcategory, product, id } }: Params) {

    const categoryDetails = await getCategory(unslug(category))
    const catObject = categoryDetails.data[0]
    if (!catObject) return notFound()

    let subList = await Promise.all(catObject.Sub_Categories.map(async (sub: string) => {
        const getSub = await getSubcategory(sub.toString())
        return getSub.data
    }))

    const subLists = subList.map(sub => sub.Subcategory.toLowerCase())

    if (!subLists.includes(unslug(subcategory))) {
        return notFound()
    }

    const productSub = await fetchSubByName(unslug(subcategory))
    const products = await getProducts(productSub.data[0].id)
    const fetchProduct = await getProduct(id)

    if (!fetchProduct) return notFound()

    const productList = products.data.map((prod: any) => prod.id)

    if (!productList.includes(fetchProduct.data.id)) {
        return notFound()
    }

    if (fetchProduct.data.Name.toLowerCase() !== unslug(product)) {
        return notFound()
    }

    return (
        <div>
            <h1>{fetchProduct.data.Name}</h1>
        </div>
    )
}

