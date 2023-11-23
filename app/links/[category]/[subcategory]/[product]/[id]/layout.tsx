import { getCategory } from "@/lib/getCategories"
import { getSubcategory, fetchSubByName } from "@/lib/getSubcategories"
import { getProduct, getProducts } from "@/lib/getProducts"


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

export async function generateMetadata({ params: { category, subcategory, product, id } }: Params) {

    const categoryDetails = await getCategory(unslug(category))
    const catObject = categoryDetails.data[0]

    if (!catObject) {
        return {
            title: '404',
            description: 'Page not found'
        }
    }

    let subList = await Promise.all(catObject.Sub_Categories.map(async (sub: string) => {
        const getSub = await getSubcategory(sub.toString())
        return getSub.data
    }))

    const subLists = subList.map(sub => sub.Subcategory.toLowerCase())

    if (!subLists.includes(unslug(subcategory))) {
        return {
            title: '404',
            description: 'Page not found'
        }
    }

    const productSub = await fetchSubByName(unslug(subcategory))
    const products = await getProducts(productSub.data[0].id)
    const fetchProduct = await getProduct(id)

    if (!fetchProduct) {
        return {
            title: '404',
            description: 'Page not found'
        }
    }

    const productList = products.data.map((prod: any) => prod.id)

    if (!productList.includes(fetchProduct.data.id)) {
        return {
            title: '404',
            description: 'Page not found'
        }
    }

    return {
        title: unslug(product.replace(/\b\w/g, (char) => char.toUpperCase())) + " | Zanda Architectural Hardware",
        description: unslug(product.replace(/\b\w/g, (char) => char.toUpperCase()))
    }
}

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}

export async function generateStaticParams({
    params: { subcategory },
}: {
    params: { subcategory: string }
}) {

    const productSub = await fetchSubByName(unslug(subcategory))
    const products = await getProducts(productSub.data[0].id)


    return products.data.map((item: any) => ({
        product: slugify(item.Name, { lower: true }),
        id: item.id,
    }))
}