interface ProgressInterface {
    progress: number
}
export default function Loading({ progress }: ProgressInterface) {
    return (
        <svg className="w-16 h-16" viewBox="0 0 36 36">
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#1F2937" />
                </linearGradient>
            </defs>

            <circle className="text-gray-300" strokeWidth="3" stroke="currentColor" fill="transparent" r="16" cx="18" cy="18" />
            <circle
                className="bg-opacity-70"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
                stroke="url(#progressGradient)"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
            />
        </svg>
    )
}