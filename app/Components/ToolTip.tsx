interface ToolTipProps {
    helpText: string;
}

const ToolTip: React.FC<ToolTipProps> = ((props) => {

    return (
        <div className="group relative inline-block">
            <svg width="1rem" height="1rem" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 12H9v-.148c0-.876.306-1.499 1-1.852.385-.195 1-.568 1-1a1.001 1.001 0 00-2 0H7c0-1.654 1.346-3 3-3s3 1 3 3-2 2.165-2 3zm-2 3h2v-2H9v2z" fill="#5C5F62"/>
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1116 0 8 8 0 01-16 0z" fill="#5C5F62"/>
            </svg>
            <p className="absolute mb-2 
                min-w-[200px] text-wrap
                px-3 py-1 text-sm text-white bg-gray-800 rounded 
                opacity-0 invisible 
                group-hover:opacity-100 group-hover:visible 
                transition-opacity duration-200 ease-in-out
                pointer-events-none group-hover:pointer-events-auto">
                    {props.helpText}
            </p>
        </div>
    )
})

export default ToolTip;