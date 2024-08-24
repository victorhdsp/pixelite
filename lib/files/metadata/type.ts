export interface ImageMetadata {
    responsive: {
        width: number,
        height: number,
        src: string,
        extensions: string[]
    }[],
    alt: string,
    updatedAt: number
}