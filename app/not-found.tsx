
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
    return <div className="h-[80vh] w-full flex flex-col gap-5 items-center justify-center">
        <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.3}
            enableHover
        >
            404
        </FuzzyText>
        <br/>
        <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.3}
            enableHover
            fontSize={'6rem'}
            fontWeight={600}
        >
            Not found
        </FuzzyText>
    </div>
}