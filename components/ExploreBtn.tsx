'use client';
import Image  from 'next/image'

export function ExploreBtn() {
    return (
        <button id="explore-btn" className="mt-7 mx-auto" type="button" onClick={() => {}}>
            <a href="#events">
                Explore Events
                <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
            </a>
        </button>
    );
}