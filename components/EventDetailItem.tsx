import Image from 'next/image'

export function EventDetailItem({ icon, alt, label } : { icon: string; alt: string, label: string } ) {
    return (
        <div className="flex-row-gap-2 items-center">
            <Image alt={alt} src={icon} height={17} width={17} />
            <p>{label}</p>
        </div>
    )
}