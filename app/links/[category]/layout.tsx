const slugify = require('slugify');
import getCategories from "@/lib/getCategories"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <h1>Layout</h1>
            <div>
                {children}
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const categories = await getCategories();

    return categories.data.map((item: any) => ({
        category: slugify(item.Name, { lower: true })
    }))
}