function Input({keywordRef, handleSearch}) {
    return (
        <div className="inputHolder">
            <input ref={keywordRef} type="text" placeholder="Enter keyword"/>
            <div className="btn" onClick={handleSearch}>Search</div>
        </div>
    );
}

export default Input;