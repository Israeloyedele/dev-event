export function EventTags({ tags } : { tags : string[] }){
    return (
        <div className="flex-row flex gap-1 5">
            {tags?.map((tag) =>
                <div className="pill" key={tag}>
                    {tag}
                </div>)}
        </div>
    )
}