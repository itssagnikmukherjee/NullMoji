import React from 'react';

const Footer = () => {
    return (
        <div className="mt-8 text-center text-muted-foreground text-sm animate-fadeIn">
            <span className="font-medium">made with <span className="text-red-500">♥︎</span> by </span>
            <span className="text-primary font-semibold underline cursor-pointer hover:text-primary/80 transition-all" onClick={() => window.open('https://github.com/itssagnikmukherjee', '_blank')}>SagnikMukherjee</span>
        </div>
    );
};

export default Footer;
