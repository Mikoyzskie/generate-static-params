
import getCategory from "@/lib/getCategory"
import getSubcategories from "@/lib/getSubcategories";
import { notFound } from "next/navigation"
import Link from "next/link"

const slugify = require('slugify');

type Params = {
    params: {
        category: string
    }
}

export async function generateMetadata({ params: { category } }: Params) {
    const categoryDetails = await getCategory(category.split('-').join(' '))
    const catObject = categoryDetails.data[0]

    if (!catObject) {
        return {
            title: '404',
            description: 'Page not found'
        }
    }

    return {
        title: catObject.Name + "| Zanda Architectural Hardware",
        description: catObject.Description
        // image: categoryData.Image,
        // url: `https://www.linksfordevs.com/category/${category}`
    }
}

export default async function CategoryPage({ params: { category } }: Params) {

    const categoryDetails = await getCategory(category.split('-').join(' '))
    const catObject = categoryDetails.data[0]

    if (!catObject) return notFound()

    const subCategory = await getSubcategories(catObject.id)

    return (
        <div>
            <h1 className="text-black">{catObject.Name}</h1>
            <div className="flex flex-col">
                {
                    subCategory.data.map((subcategory: any) => (
                        <Link href={`${category}/${slugify(subcategory.Subcategory, { lower: true })}`} key={subcategory.id}>{subcategory.Subcategory}</Link>
                    ))
                }
            </div>
        </div>
    )
}

