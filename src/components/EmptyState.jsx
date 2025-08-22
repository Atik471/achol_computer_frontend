export const EmptyState = () => (
    <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
        <svg
            viewBox="0 0 200 200"
            role="img"
            aria-label="Empty Box"
            className="w-40 h-40 text-gray-400 dark:text-gray-500"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" role="img" aria-labelledby="title desc">
                <title id="title">Empty Box</title>
                <desc id="desc">An outlined 3D box with subtle shadow indicating no items.</desc>

                {/* <!-- Subtle background shape (auto tints with currentColor) --> */}
                <g opacity="0.08" fill="currentColor">
                    <ellipse cx="100" cy="150" rx="58" ry="12" />
                </g>

                {/* <!-- Box base (front face) --> */}
                <g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">
                    <path d="M60 86 L100 106 L100 146 L60 126 Z" fill="rgba(0,0,0,0.02)" />

                    {/* <!-- Right face --> */}
                    <path d="M100 106 L140 86 L140 126 L100 146 Z" fill="rgba(0,0,0,0.02)" />

                    {/* <!-- Top face --> */}
                    <path d="M60 86 L100 66 L140 86 L100 106 Z" fill="rgba(0,0,0,0.02)" />

                    {/* <!-- Left flap --> */}
                    <path d="M60 86 L40 76 L80 56 L100 66 Z" fill="rgba(0,0,0,0.02)" />

                    {/* <!-- Right flap --> */}
                    <path d="M140 86 L160 76 L120 56 L100 66 Z" fill="rgba(0,0,0,0.02)" />
                </g>

                {/* <!-- Dashed ground line --> */}
                <path d="M55 160 H145" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 8" opacity="0.35" />

                {/* <!-- Sparkles --> */}
                <g stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.65">
                    <path d="M30 70 v8M26 74 h8" />
                    <path d="M170 92 v8M166 96 h8" />
                    <path d="M95 38 v10M90 43 h10" />
                </g>

                {/* <!-- Gentle highlight lines --> */}
                <g stroke="currentColor" stroke-width="1.5" opacity="0.35">
                    <path d="M62 124 L98 142" />
                    <path d="M102 142 L138 124" />
                </g>
            </svg>

        </svg>
        <h2 className="text-xl font-semibold">No Products Found</h2>
        <p className="text-gray-500 dark:text-gray-400">
            Check back later or try different filters.
        </p>
    </div>
);