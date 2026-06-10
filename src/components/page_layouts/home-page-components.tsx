
// TODO Move into index.astro once I figure out how to center it.

export function HomePageLogo() {
    return (
        // KelsonCraft logo.
        <div className="p-6 flex justify-center">
            <img src="/android-chrome-512x512.png" alt="KelsonCraft Logo 512x512" width={128}
                   height={128}></img>
        </div>
    )
}