import { getCategory } from "@/lib/getCategories"
import { getSubcategories } from "@/lib/getSubcategories";
import { notFound } from "next/navigation"
import Link from "next/link"

const slugify = require('slugify');

type Params = {
    params: {
        category: string
    }
}

async function checkCategory(category: string) {
    const categoryDetails = await getCategory(category.split('-').join(' '))
    return categoryDetails.data[0]
}

export default async function CategoryPage({ params: { category } }: Params) {

    const catObject = await checkCategory(category)

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

