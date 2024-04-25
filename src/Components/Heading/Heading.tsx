import React, { useEffect, useState } from 'react'
import sunIcon from '../../assets/images/icon-sun.svg'
import moonIcon from "../../assets/images/icon-moon.svg"

const Heading: React.FC = () => {
    const light: string = 'light';
    const dark: string = 'dark';
    const root = document.documentElement;
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || light);

    useEffect(() => {
        root.classList.add(theme);
    }, []);

    const switchTheme = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as Element;

        const newTheme = theme === light ? dark : light;
        root.classList.replace(theme, newTheme);
        target.classList.add('clicked');
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }

    return (
        <header className='mb-[30px]'>
            <div className='flex items-center justify-between'>
                <h2 className='text-[26px] md:text-[38px] font-bold uppercase tracking-[9px] md:tracking-[16px] text-white'>
                    Todo
                </h2>
                <button onClick={e => switchTheme(e)}>
                    <img
                        src={theme === dark ? `${sunIcon}` : `${moonIcon}`}
                        className='h-[24px] w-[24px] transition'
                        alt="theme-icon"
                    />
                </button>
            </div>
        </header>
    )
}

export default Heading
