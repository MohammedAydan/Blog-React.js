import { MediaPostsPath } from "../MyMethods/MyMethods";

function OpenImage({ imgUrl = "", onClose }) {
    return (
        <div>
            <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                <button
                    onClick={onClose}
                    className="fixed top-5 right-5 text-white w-12 h-12 rounded-full bg-slate-600"
                >
                    X
                </button>
                <div className="max-h-full flex">
                    <img
                        loading="lazy"
                        src={MediaPostsPath + imgUrl}
                        alt={imgUrl.split("/")[imgUrl.split("/").length - 1]}
                        className="mt-2 w-full rounded-xl shadow-lg max-w-3xl object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

export default OpenImage;
