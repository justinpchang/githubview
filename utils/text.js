export function space(nestingLevel, hovering) {
    return Array(nestingLevel).fill(<span><span style={{borderRight: `1px solid ${hovering ? 'lightgrey' : 'white'}`}}>&nbsp;</span>&nbsp;</span>);
}