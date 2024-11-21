const InputAction = ({className,text,onTextChange, handleText, placeholder, buttonLabel}) => {
    return ( 
        <div className="input-action-container">
        <input className={className} placeholder={placeholder} type="text" value={text} onChange={(e) => onTextChange(e.target.value)} />
            {text.length > 0 && (
                <button className="action-button post-button" onClick={handleText}>{buttonLabel}</button>
            )}
        </div>
     );
}
 
export default InputAction;