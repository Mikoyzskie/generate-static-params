
import { getCategories, getCategory } from "@/lib/getCategories"

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
        title: catObject.Name + " | Zanda Architectural Hardware",
        description: catObject.Description
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

export async function generateStaticParams() {
    const categories = await getCategories();

    return categories.data.map((item: any) => ({
        category: slugify(item.Name, { lower: true })
    }))
}