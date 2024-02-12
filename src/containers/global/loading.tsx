export default function Loading({ sizeInPx }: { sizeInPx: number }) {
    return (<div className="loader-circle" style={{ width: `${sizeInPx || 20}px`, height: `${sizeInPx || 20}px` }} ></div>)
}