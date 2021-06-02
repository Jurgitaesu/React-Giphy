
function Grid({gifs, openModal}) {
    return (
        <div className="grid-container">
            {gifs &&
            gifs.map(gif =>
                <img src={gif.images.original.url} alt="gif" key={gif.id} className="grid-img"
                     onClick={() => openModal(gif.id)}/>
            )
            }
        </div>
    );
}

export default Grid;