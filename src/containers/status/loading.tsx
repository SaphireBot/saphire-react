import Loading from "../global/loading";

export default function LoadingComponent({ id, text, background }: { id?: string, text?: string, background?: string }) {
    return (
        <div
            className="badge-status"
            style={{
                display: "flex",
                justifyContent: "center",
                background: background ? background : "#363636"
            }}
            id={id || `${Math.random()}`}
        >
            {text ? text : <Loading sizeInPx={20} />}
        </div>
    );
}