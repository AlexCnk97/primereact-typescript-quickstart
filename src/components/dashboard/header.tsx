import React from 'react';

interface Props{
    title:string;
}


const HeaderDash:React.FC<Props> = ({title}) => {
    return (
        <div className="p-grid">
            <div className="p-col-6 p-d-flex p-jc-start p-ai-center">
                <span>{title}</span>
            </div>
            <div className="p-col-6 p-d-flex p-jc-end p-ai-center">
                <img style={{ height: 45 }} src="https://clobi.online/img/Clobi_Logo.png" alt="clobi_logo" />
            </div>
        </div>
    )
}

export default HeaderDash;