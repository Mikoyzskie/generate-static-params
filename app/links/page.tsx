import getCategories from "@/lib/getCategories"
import Link from "next/link"


const slugify = require('slugify');

export default async function Page() {

    const categories = await getCategories()

    return (
        <div>
            {
                categories.data.map((item: any) => (
                    <div key={item.id}>
                        <Link href={`/links/${slugify(item.Name, { lower: true })}`}>{item.Name}</Link>
                    </div>
                ))
            }
        </div>
    )
}