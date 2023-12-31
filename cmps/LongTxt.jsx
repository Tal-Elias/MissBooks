const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    function toggleExpansion() {
        setIsExpanded(!isExpanded)
    }

    const displayText = isExpanded ? txt : txt.slice(0, length) + '...'

    return (
        <div>
            <p className="desc-p">{displayText}
                {txt.length > length && (
                    <button onClick={toggleExpansion}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </p>
        </div>
    )
}
