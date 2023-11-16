import { fetchSubcategories } from "@/lib/fetchParamSub"

const slugify = require('slugify');

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
