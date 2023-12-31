import { getCategory } from "@/lib/getCategories"
import { getSubcategory, fetchSubcategories, fetchSubByName } from "@/lib/getSubcategories"

const slugify = require('slugify');
const unslug = (word: string) => word.split('-').join(' ')

type Params = {
    params: {
        category: string
        subcategory: string
    }
}

export async function generateMetadata({ params: { category, subcategory } }: Params) {

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

    const subcats = await fetchSubByName(unslug(subcategory))

    return {
        title: unslug(subcategory.replace(/\b\w/g, (char) => char.toUpperCase())) + " | Zanda Architectural Hardware",
        description: subcats.data[0].Description
    }
}

export default function Layout({
    children,
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
    params: { category },
}: {
    params: { category: string }
}) {

    const subtest = await fetchSubcategories(category);
    // console.log(subtest);

    return subtest.map((item) => ({
        subcategory: slugify(item, { lower: true })
    }))
}
