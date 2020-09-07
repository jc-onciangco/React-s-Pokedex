import React from 'react';

const EggGroups = ({content, titles}) => {
    return (
        <div className="egg-groups stat-container">
            {
                titles.map(title => {
                    return (
                        <div key={title} className={`title ${title}-title`}>{title}</div>
                    )
                })
            }

            <div className="content">
                {   
                    content? (
                        content.map((data, index) => {
                            return (
                                <p key={index}>
                                    {data.name}
                                </p>
                            )
                        })
                    ):
                    (
                        <p>LOADING....</p>
                    )
                }
            </div>
        </div>
    )
}

export default EggGroups;