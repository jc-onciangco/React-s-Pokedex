import React from 'react';

const TitleBlock = ({title}) => {
    const style = {
        titleBlock: {
            width: '50%',
            textAlign: 'left',
            backgroundColor: '#4E5665',
            color: 'white',
            padding: '5px 10px',
            fontSize: '1.1rem',
            letterSpacing: '2px',
            borderRadius: '6px',
            marginBottom: '25px',
            fontWeight: '600'
        }
    }
    return (
        <div style={style.titleBlock}>{title}</div>
    )
}

export default TitleBlock;